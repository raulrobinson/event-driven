"use client";

import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";

export default function EmailNotifications() {
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const client = new Client({
            brokerURL: "ws://localhost:9002/ws", // Asegúrate de usar el puerto correcto
            reconnectDelay: 5000, // Intenta reconectar cada 5 segundos
            onConnect: () => {
                console.log("Conectado a WebSocket STOMP");

                // Suscribirse a eventos del backend
                client.subscribe("/topic/orders", (message) => {
                    setMessages((prev) => [...prev, message.body]);
                });
            },
            onStompError: (frame) => {
                console.error("Error en STOMP:", frame);
            }
        });

        client.activate(); // Iniciar conexión

        //return () => client.deactivate(); // Cerrar conexión al desmontar componente
    }, []);

    return (
        <div>
            <h2>Mensajes WebSocket</h2>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </div>
    );
}
