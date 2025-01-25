import styled from "styled-components";

export const Container = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f8f9fa;
`;

export const Header = styled.header`
    background: #1f1f23;
    color: white;
    padding: 1rem 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h1 {
        margin: 0;
        font-size: 1.5rem;
    }
`;

export const Content = styled.main`
    flex: 1;
    padding: 2rem;
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
`;

export const ConfigSection = styled.section`
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const Title = styled.h2`
    margin: 0 0 1rem 0;
    font-size: 1.25rem;
    color: #1f1f23;
`;

export const StreamStatus = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
`;

export const StatusIndicator = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${(props) => (props.$active ? "#00b894" : "#ff7675")};
`;

export const Button = styled.button`
    background: #9147ff;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    width: 100%;

    &:hover {
        background: #772ce8;
    }
`;

export const OBSInstructions = styled.div`
    margin-top: 1rem;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 4px;

    h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1rem;
    }

    ol {
        margin: 0;
        padding-left: 1.25rem;
    }

    li {
        margin: 0.5rem 0;
        font-size: 0.875rem;
    }

    code {
        background: #e9ecef;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.875rem;
    }
`;

export const CommentsList = styled.section`
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const Comment = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 1rem;
    border-bottom: 1px solid #eee;
    gap: 1rem;

    &:last-child {
        border-bottom: none;
    }
`;

export const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`;

export const CommentContent = styled.div`
    flex: 1;
`;

export const Author = styled.div`
    font-weight: bold;
    color: #6441a5;
    margin-bottom: 0.25rem;
`;

export const Message = styled.div`
    color: #1f1f23;
    line-height: 1.4;
`;

export const Timestamp = styled.div`
    font-size: 0.75rem;
    color: #666;
    margin-top: 0.25rem;
`;

export const ShowButton = styled.button`
    background: #9147ff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 0.875rem;
    white-space: nowrap;

    &:hover {
        background: #772ce8;
    }
`;
