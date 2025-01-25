import { useEffect, useCallback, useRef } from 'react';
import useCommentStore from '../store/commentStore';
import { fetchLiveChatId, fetchLiveChatMessages } from '../services/youtubeApi';

const POLLING_INTERVAL = 3000; // 3 seconds minimum polling interval
const MAX_COMMENTS = 10; // Maximum number of comments to keep

const useYouTubeLiveChat = (videoUrl) => {
  const { setError, setComments, setLoading } = useCommentStore();
  const timeoutRef = useRef(null);
  const mountedRef = useRef(true);
  const seenCommentsRef = useRef(new Set());
  const pageTokenRef = useRef('');
  
  const fetchComments = useCallback(async (videoId, apiKey, liveChatId) => {
    if (!mountedRef.current) return;
    
    try {
      setLoading(true);
      const { messages, nextPageToken, pollingIntervalMs } = await fetchLiveChatMessages(
        liveChatId,
        apiKey,
        pageTokenRef.current
      );
      
      if (!mountedRef.current) return;
      
      // Filter out messages we've already seen
      const newMessages = messages.filter(msg => !seenCommentsRef.current.has(msg.id));
      
      if (newMessages.length > 0) {
        // Add new message IDs to our seen set
        newMessages.forEach(msg => seenCommentsRef.current.add(msg.id));
        
        // Update comments in store
        setComments(currentComments => {
          // Add new messages to the end and keep only the last MAX_COMMENTS
          const allComments = [...currentComments, ...newMessages];
          return allComments.slice(-MAX_COMMENTS);
        });
      }
      
      pageTokenRef.current = nextPageToken;
      
      // Use the maximum of YouTube's polling interval and our minimum interval
      const nextPollInterval = Math.max(pollingIntervalMs, POLLING_INTERVAL);
      
      // Schedule next poll
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        fetchComments(videoId, apiKey, liveChatId);
      }, nextPollInterval);
      
    } catch (error) {
      if (mountedRef.current) {
        console.error('Error polling comments:', error);
        setError('Failed to fetch new comments: ' + error.message);
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [setComments, setError, setLoading]);

  const initializeLiveChat = useCallback(async (videoId, apiKey) => {
    try {
      setLoading(true);
      const liveChatId = await fetchLiveChatId(videoId, apiKey);
      if (!mountedRef.current) return;
      
      // Reset state for new chat
      seenCommentsRef.current = new Set();
      pageTokenRef.current = '';
      setComments([]);
      
      // Start polling
      fetchComments(videoId, apiKey, liveChatId);
    } catch (error) {
      if (mountedRef.current) {
        setError(error.message);
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [fetchComments, setComments, setError, setLoading]);

  useEffect(() => {
    mountedRef.current = true;
    
    if (!videoUrl) return;
    
    try {
      const url = new URL(videoUrl);
      const videoId = url.searchParams.get('v');
      if (!videoId) throw new Error('Invalid YouTube URL');
      
      const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
      if (!apiKey) {
        throw new Error('YouTube API key not found. Please add it to your .env file.');
      }
      
      initializeLiveChat(videoId, apiKey);
      setError(null);
    } catch (error) {
      setError(error.message);
    }

    // Cleanup function
    return () => {
      mountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [videoUrl, initializeLiveChat, setError]);
};

export default useYouTubeLiveChat;