"use client";

import {useEffect, useState} from "react";
import OrderI from "../../interfaces/OrderI";
import axios from "axios";
import useWebSocket from "react-use-websocket";
import { Bell } from "lucide-react";

export default function Home() {
    const [orders, setOrders] = useState<OrderI[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [qty, setQty] = useState<number>(0);
    const [price, setPrice] = useState<number>(0.0);
    const [notifications, setNotifications] = useState<OrderI[]>([]);

    // const { lastJsonMessage } = useWebSocket("ws://localhost:9002/ws", {
    //     onMessage: (event: { data: string; }) => {
    //         const data: OrderI = JSON.parse(event.data);
    //         setNotifications((prev) => [...prev, data]);
    //     },
    //     shouldReconnect: () => true,
    // });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("/api/create-order", {
                name: name,
                qty: qty,
                price: price,
            });
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error al crear la orden", error);
        }
    };

    const fetchData = async () => {
        try {
            const orders = await axios.get('/api/fetch-orders');
            const ordersResult: OrderI[] = orders.data;
            setOrders(ordersResult);
        } catch (error) {
            console.log(error);
        }
    };

    // useEffect(() => {
    //     const eventSource = new EventSource("/api/email-notifications"); // Ajustar con tu servicio
    //     eventSource.onmessage = (event) => {
    //         const newMessage = event.data;
    //         setNotifications((prev) => [...prev, newMessage]);
    //     };
    //     return () => eventSource.close();
    // }, []);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 1000);
        return () => clearInterval(interval);
    }, []);

    const openModal = () => {
        setName("");
        setQty(0);
        setPrice(0.0);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setName("");
        setQty(0);
        setPrice(0.0);
    };

    return (
        <div className="container mx-auto p-4">
            {/* Icono de Notificación */}
            {/*<div className="absolute top-4 right-4">*/}
            {/*    <div className="relative cursor-pointer">*/}
            {/*        <Bell className="w-8 h-8 text-gray-700" />*/}
            {/*        {notifications.length > 0 && (*/}
            {/*            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">*/}
            {/*                {notifications.length}*/}
            {/*            </span>*/}
            {/*        )}*/}
            {/*    </div>*/}
            {/*</div>*/}

            <h1 className="text-4xl font-bold text-center">Welcome to the Event Driven Architecture Workshop</h1>
            <div className="overflow-x-auto mt-6">
                <h2 className="text-2xl mb-4">Orders</h2>
                <button onClick={() => openModal()} className="bg-green-500 text-white px-4 py-2 rounded mb-4">
                    New Order
                </button>
                <table className="w-full text-center border-collapse">
                    <thead>
                    <tr className="bg-gray-800">
                        <th className="px-4 py-2 border">Order Identification</th>
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">Quantity</th>
                        <th className="px-4 py-2 border">Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="border p-2 text-center">
                                No orders found
                            </td>
                        </tr>
                    ) : (
                        orders.map((order) => (
                            <tr key={order.order_id} className="text-center">
                                <td className="border p-2">{order.order_id}</td>
                                <td className="border p-2">{order.name}</td>
                                <td className="border p-2">{order.qty}</td>
                                <td className="border p-2">${order.price}</td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            {/* MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h3 className="text-lg mb-4 font-black text-gray-900">Create New Order</h3>
                        <form onSubmit={handleSubmit}>
                            <label className="block mb-2 text-gray-900">Name:</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                                   className="w-full p-2 border rounded mb-4 text-gray-900" required />

                            <label className="block mb-2 text-gray-900">Quantity:</label>
                            <input type="number" value={qty} onChange={(e) => setQty(Number(e.target.value))}
                                   className="w-full p-2 border rounded mb-4 text-gray-900" required />

                            <label className="block mb-2 text-gray-900">Price:</label>
                            <input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                                   className="w-full p-2 border rounded mb-4 text-gray-900" required />

                            <div className="flex justify-end">
                                <button type="button" onClick={() => closeModal()}
                                        className="bg-gray-400 text-white px-4 py-2 rounded mr-2">
                                    Cancel
                                </button>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
