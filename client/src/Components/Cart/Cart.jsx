import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import styles from './Cart.module.scss'
import { UserContext } from '../../context/UserContext';
import axios from 'axios';

const Cart = ({ open, onClose }) => {
    const [cartItemQuant, setCartItemQuant] = useState(0);
    const [cart, setCart] = useState([]);
    const { user } = useContext(UserContext);


    useEffect(() => {
        if (open) {
            fetchCartItems();
        }
    }, [open]);
    if (!open) return null;


    const updateCartItemQuantity = async (title, newQuantity) => {
        try {
            const response = await axios.post(
                `http://localhost:5000/cart/updateQuant/${user.cart_id}`,
                {
                    title, // Передаем название блюда на сервер
                    quantity: newQuantity,
                }
            );
            // После успешного обновления количества, обновляем список товаров в корзине
            fetchCartItems();
        } catch (error) {
            console.error(error); // Обработка ошибок
        }
    };

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/cart/${user.cart_id}`);
            const data = response.data;

            // Обновляем общую сумму товаров в корзине
            const total = data.dishes.reduce(
                (acc, dish) => acc + dish.cost * dish.quantity,
                0
            );
            data.total = total;
            setCart(data);
        } catch (error) {
            console.error(error);
        }
    };

    const removeDish = async (title) => {
        try {
            const response = await axios.post(`http://localhost:5000/cart/removeDish/${user.cart_id}`, {
                title, // Передаем название блюда на сервер
            });

            fetchCartItems();
        } catch (error) {
            console.error(error); // Обработка ошибок
        }
    };
    
    const handleDecrement = async (title, currentQuantity) => {
        if (currentQuantity > 1) {
            const newQuantity = currentQuantity - 1;
            await updateCartItemQuantity(title, newQuantity);
        }
    };

    const handleIncrement = async (title, currentQuantity) => {
        const newQuantity = currentQuantity + 1;
        await updateCartItemQuantity(title, newQuantity);
    };





    return (
        <>
            <div className={styles.cart}>
                <div onClick={onClose} className={styles.back_menu}>
                    <img src="./back.svg" alt="" />
                    <p className={styles.cancel}>back to menu</p>
                </div>

                <div className={styles.cart_items}>
                    {cart.dishes && cart.dishes.map((el) => (
                        <div className={styles.cart_item}>
                            <div className={styles.cart_item_text}>
                                <div className={styles.cart_item_title}>{el.title}</div>
                                <div className={styles.cart_item_subtitle}>Dark chocolate Butter, Brown sugar, Egg, Wheat flour, Walnuts</div>
                            </div>
                            <div className={styles.menu_item_numbers}>
                                <p className={styles.cart_item_weight}>175g</p>
                                <div className={styles.cart_item_controller}>
                                    <button type="button" onClick={() => handleDecrement(el.title, el.quantity)} className={styles.cart_item_minus}>
                                        -
                                    </button>
                                    <p className={styles.cart_item_quant}>{el.quantity}</p>
                                    <button type="button" onClick={() => handleIncrement(el.title, el.quantity)} className={styles.cart_item_plus}>
                                        +
                                    </button>
                                </div>
                                <p className={styles.cart_item_cost}>{el.cost}₴</p>
                                <button onClick={() => removeDish(el.title)} className={styles.menu_item_cancel}><img src="./cancel.svg" alt="" /></button>
                            </div>
                        </div>
                    ))}

                    <div className={styles.cart_line}></div>
                    <div className={styles.cart_underline}>
                        <p className={styles.cart_summ_text}>Account amount:</p>
                        <p className={styles.cart_summ_price}>{cart.total}₴</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart