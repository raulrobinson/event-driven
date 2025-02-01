import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface OrderRequest {
    name: string,
    qty: number
    price: number,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Configurar CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Manejar solicitudes OPTIONS (pre-flight para CORS)
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method === "POST") {
        try {
            //const { name, qty, price } = req.body;
            const request: OrderRequest = req.body;

            if (!request.name || !request.qty || !request.price) {
                return res.status(400).json({ message: "Missing data..." });
            }

            console.log("Request:", request);

            // Enviar datos a la API externa con Axios
            const response = await axios.post("http://localhost:9001/order-service/v1/orders", {
                name: request.name,
                qty: request.qty,
                price: request.price
            });

            return res.status(201).json(response.data);
        } catch (error: any) {
            return res.status(500).json({ message: error.message || "Error del servidor" });
        }
    } else {
        return res.status(405).json({ message: "Método no permitido" });
    }
}
