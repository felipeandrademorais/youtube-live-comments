import { defineConfig } from "vite";
import { WebSocketServer } from "ws";

export default defineConfig({
    server: {
        port: 3000,
    },
    plugins: [
        {
            name: "websocket-plugin",
            configureServer(server) {
                const wss = new WebSocketServer({ noServer: true });

                server.httpServer.on("upgrade", (req, socket, head) => {
                    if (req.url === "/ws") {
                        wss.handleUpgrade(req, socket, head, (ws) => {
                            wss.emit("connection", ws, req);
                        });
                    }
                });

                wss.on("connection", (ws) => {
                    console.log("Cliente conectado ao WebSocket");

                    // Broadcast de mensagens para todos os clientes conectados
                    ws.on("message", (message) => {
                        console.log("Mensagem recebida:", message);
                        wss.clients.forEach((client) => {
                            if (client.readyState === 1) {
                                client.send(message);
                            }
                        });
                    });

                    ws.on("close", () => {
                        console.log("Cliente desconectado do WebSocket");
                    });
                });
            },
        },
    ],
});
