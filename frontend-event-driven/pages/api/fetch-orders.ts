import {NextApiRequest, NextApiResponse} from "next";
import { AppDataSource } from '../../lib/db';
import Order from "../../entities/Order";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Initialize the database connection.
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        const orderRepository = AppDataSource.getRepository(Order);

        const rows = await orderRepository.find();

        // If the query returns more than 0 rows, return the rows.
        if (rows.length > 0) {
            console.log('orders total:', rows.length);
            // rows.forEach(row => {
            //     console.log(`Price for order ${row.order_id}:`, row.price, typeof row.price);
            // });
            const formattedRows = rows.map(row => ({
                ...row,
                price: row.price !== null ? row.price.toFixed(2) : '0.00',
            }));
            return res.status(200).json(formattedRows);
        } else {
            console.error('orders not found');
            return res.status(204).json({ message: 'orders not found' });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}