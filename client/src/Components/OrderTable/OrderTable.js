import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { UserContext } from '../../context/UserContext';
import Order from '../../';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from '@mui/material';

const TableContainerWrapper = styled(TableContainer)`
    margin-top: 0;
    font-family: 'Montserrat', sans-serif;
`;

const Title = styled(TableHead)`
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    margin-bottom: 40px;
`;

const TableCellStyled = styled(TableCell)`

    font-family: 'Montserrat', sans-serif;
`;

const OrdersTable = () => {
    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch(`http://localhost:5000/orders/${user.user_id}`);
            const data = await response.json();
            console.log(data);
            setOrders(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <TableContainerWrapper component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCellStyled>Order Number</TableCellStyled>
                            <TableCellStyled>Dishes</TableCellStyled>
                            <TableCellStyled>Total</TableCellStyled>
                            <TableCellStyled>Created At</TableCellStyled>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order._id}>
                                <TableCellStyled>{order.orderNumber}</TableCellStyled>
                                <TableCellStyled>
                                    {order.dishes.map((dish) => (
                                        <div key={dish._id}>
                                            <span>{dish.title}</span>
                                            <span> - ${dish.cost}</span>
                                            <span> x {dish.quantity}</span>
                                        </div>
                                    ))}
                                </TableCellStyled>
                                <TableCellStyled>${order.total}</TableCellStyled>
                                <TableCellStyled>{order.createdAt}</TableCellStyled>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainerWrapper>
        </div>
    );
};

export default OrdersTable;
