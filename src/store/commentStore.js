import { create } from "zustand";

const useCommentStore = create((set) => ({
    comments: [],
    selectedComment: null,
    isModalOpen: false,
    streamUrl: "",
    loading: false,
    error: null,

    setComments: (updater) =>
        set((state) => {
            const newComments =
                typeof updater === "function"
                    ? updater(state.comments)
                    : updater;
            return { comments: newComments };
        }),

    addComment: (comment) =>
        set((state) => ({
            comments: [comment, ...state.comments],
        })),

    setSelectedComment: (comment) => {
        set({ selectedComment: comment });
        // Atualiza o localStorage sempre que o selectedComment muda
        if (comment) {
            localStorage.setItem("selectedComment", JSON.stringify(comment));
        } else {
            localStorage.removeItem("selectedComment");
        }
    },

    setModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
    setStreamUrl: (url) => set({ streamUrl: url }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
}));

export default useCommentStore;
