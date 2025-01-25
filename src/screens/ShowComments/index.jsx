import React, { useEffect, useState } from "react";
import {
    Container,
    CommentDisplay,
    Avatar,
    CommentContent,
    CommentAuthor,
    CommentText,
} from "./styles";

const ShowComments = () => {
    const [selectedComment, setSelectedComment] = useState(null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:3000/ws");

        ws.onmessage = async (event) => {
            console.log("Event:", event.data.text());
            const text = await event.data.text();
            const comment = JSON.parse(text);
            console.log("Comentário recebido:", comment);
            setSelectedComment(comment);
            setTimeout(() => {
                setSelectedComment(null);
            }, 5000);
        };

        ws.onerror = (event) => {
            console.error("Erro no WebSocket:");
            console.log("Tipo do erro:", event.type);
            console.log("URL:", ws.url);
            console.log("Estado:", ws.readyState);
        };

        ws.onclose = (event) => {
            console.warn("WebSocket fechado:");
            console.log("Código:", event.code);
            console.log(
                "Motivo:",
                event.reason || "Nenhum motivo especificado"
            );
            console.log("Fechamento limpo:", event.wasClean); // true se o fechamento foi limpo
        };
    }, []);
    // Exibe apenas se houver um comentário selecionado
    if (!selectedComment) {
        return null;
    }

    return (
        <Container>
            <CommentDisplay>
                <Avatar
                    src={selectedComment.authorProfileImageUrl}
                    alt={selectedComment.authorDisplayName}
                />
                <CommentContent>
                    <CommentAuthor>
                        {selectedComment.authorDisplayName}
                    </CommentAuthor>
                    <CommentText>{selectedComment.textDisplay}</CommentText>
                </CommentContent>
            </CommentDisplay>
        </Container>
    );
};

export default ShowComments;
