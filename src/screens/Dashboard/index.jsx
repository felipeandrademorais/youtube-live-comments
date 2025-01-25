import React from "react";
import Modal from "../../components/Modal";
import useCommentStore from "../../store/commentStore";
import useYouTubeLiveChat from "../../hooks/useYouTubeLiveChat";
import { format } from "date-fns";
import {
    Container,
    Header,
    Content,
    ConfigSection,
    Title,
    StreamStatus,
    StatusIndicator,
    Button,
    OBSInstructions,
    CommentsList,
    Comment,
    CommentContent,
    Avatar,
    Author,
    Message,
    Timestamp,
    ShowButton,
} from "./styles";

const Dashboard = () => {
    const {
        isModalOpen,
        streamUrl,
        comments,
        loading,
        error,
        setModalOpen,
        setStreamUrl,
        setError,
    } = useCommentStore();

    useYouTubeLiveChat(streamUrl);

    const handleShowComments = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleStreamUrlSubmit = (url) => {
        try {
            const videoId = new URL(url).searchParams.get("v");
            if (!videoId) throw new Error("Invalid YouTube URL");

            setStreamUrl(url);
            setModalOpen(false);
            setError(null);
        } catch (err) {
            setError("Please enter a valid YouTube Live URL");
        }
    };

    const handleShowComment = (comment) => {
        const ws = new WebSocket("ws://127.0.0.1:3000/ws");
        ws.onopen = () => {
            ws.send(JSON.stringify(comment)); // Envia o comentário ao WebSocket
            console.log("Comentário enviado:", comment);
        };
        ws.onerror = (err) => console.error("Erro no WebSocket:", err);
    };

    return (
        <Container>
            <Header>
                <h1>YouTube Live Comments Dashboard</h1>
            </Header>

            <Content>
                <ConfigSection>
                    <Title>Stream Configuration</Title>
                    <StreamStatus>
                        <StatusIndicator $active={!!streamUrl} />
                        <span>
                            {streamUrl
                                ? "Stream Connected"
                                : "No Stream Connected"}
                        </span>
                    </StreamStatus>

                    {!streamUrl ? (
                        <Button onClick={handleShowComments}>
                            Connect Stream
                        </Button>
                    ) : (
                        <OBSInstructions>
                            <h3>OBS Setup Instructions</h3>
                            <ol>
                                <li>In OBS, add a new "Browser" source</li>
                                <li>
                                    Set the URL to:{" "}
                                    <code>{window.location.origin}/show</code>
                                </li>
                                <li>
                                    Set the width to match your stream's width
                                    (e.g., 1920)
                                </li>
                                <li>
                                    Set the height to match your stream's height
                                    (e.g., 1080)
                                </li>
                                <li>
                                    Important: Check "Refresh browser when scene
                                    becomes active"
                                </li>
                                <li>Click "OK" to save the source</li>
                            </ol>
                        </OBSInstructions>
                    )}

                    {error && (
                        <div style={{ color: "red", marginTop: "1rem" }}>
                            {error}
                        </div>
                    )}
                </ConfigSection>

                {streamUrl && (
                    <CommentsList>
                        <Title>Live Comments</Title>
                        {loading && <div>Loading comments...</div>}
                        {comments.map((comment) => (
                            <Comment key={comment.id}>
                                <Avatar
                                    src={comment.authorProfileImageUrl}
                                    alt={comment.authorDisplayName}
                                />
                                <CommentContent>
                                    <Author>{comment.authorDisplayName}</Author>
                                    <Message>{comment.textDisplay}</Message>
                                    <Timestamp>
                                        {format(
                                            new Date(comment.publishedAt),
                                            "HH:mm:ss"
                                        )}
                                    </Timestamp>
                                </CommentContent>
                                <ShowButton
                                    onClick={() => handleShowComment(comment)}
                                >
                                    Show
                                </ShowButton>
                            </Comment>
                        ))}
                    </CommentsList>
                )}
            </Content>

            <Modal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSubmit={handleStreamUrlSubmit}
            />
        </Container>
    );
};

export default Dashboard;
