import styled from "styled-components";

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    display: flex;
    align-items: flex-end;
    padding: 2rem;
`;

export const CommentDisplay = styled.div`
    background: rgba(0, 0, 0, 0.8);
    border-radius: 8px;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    animation: fadeIn 0.3s ease-in-out;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(20px);
        }
    }

    &.hiding {
        animation: fadeOut 0.3s ease-in-out forwards;
    }
`;

export const Avatar = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50%;
`;

export const CommentContent = styled.div`
    flex: 1;
    color: white;
`;

export const CommentAuthor = styled.div`
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #9147ff;
`;

export const CommentText = styled.div`
    font-size: 1.25rem;
    line-height: 1.4;
`;
