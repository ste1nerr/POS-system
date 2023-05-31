import React, { useContext, useEffect, useState } from 'react';
import styles from './Cart.module.scss';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import PersonalData from '../../Components/PersonalData/PersonalData'; // Импортируем компонент PersonalData

const Cart = ({ open, onClose }) => {
    const [cartItemQuant, setCartItemQuant] = useState(0);
    const [cart, setCart] = useState([]);
    const { user } = useContext(UserContext);
    const [isEmptyCart, setIsEmptyCart] = useState(false);
    const [showPersonalData, setShowPersonalData] = useState(false);
    const [isPersonalDataFilled, setIsPersonalDataFilled] = useState(false);
    const [personalData, setPersonalData] = useState(null);

    const handleSave = async (data) => {
        setPersonalData(data);
        setIsPersonalDataFilled(true); // Set the flag indicating that the data is filled
        await createOrder(); // Call createOrder function to submit the order
      };

    const createOrder = async () => {
        try {
            const cartItemsResponse = await axios.get(`http://localhost:5000/cart/${user.cart_id}`);
            const cartItems = cartItemsResponse.data;

            if (cartItems.length === 0) {
                setIsEmptyCart(true);
                return;
            }

            const dataToSend = {
                userId: user._id,
                personalData: personalData,
            };

            const response = await axios.post(`http://localhost:5000/cart/confirmOrder/${user.cart_id}`, dataToSend);
            fetchCartItems();
            if (response.ok) {
                fetchCartItems();
            } else {
                console.error('Ошибка при оформлении заказа:', response.status);
            }
        } catch (error) {
            console.error('Ошибка при оформлении заказа:', error);
        }
    };

    useEffect(() => {
        if (open) {
            fetchCartItems();
        }
    }, [open]);

    if (!open) return null;

    const updateCartItemQuantity = async (title, newQuantity) => {
        try {
            const response = await axios.post(`http://localhost:5000/cart/updateQuant/${user.cart_id}`, {
                title,
                quantity: newQuantity,
            });
            fetchCartItems();
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/cart/${user.cart_id}`);
            const data = response.data;
            const total = data.dishes.reduce((acc, dish) => acc + dish.cost * dish.quantity, 0);
            data.total = total;
            setCart(data);
            setIsEmptyCart(data.dishes.length === 0);
        } catch (error) {
            console.error(error);
        }
    };

    const removeDish = async (title) => {
        try {
            const response = await axios.post(`http://localhost:5000/cart/removeDish/${user.cart_id}`, {
                title,
            });
            fetchCartItems();
        } catch (error) {
            console.error(error);
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
    const handlePersonalDataClose = () => {
        setShowPersonalData(false); // Сброс состояния при закрытии модального окна
    };
    const handleConfirmOrder = async () => {
        if (!isEmptyCart && isPersonalDataFilled) {
            setShowPersonalData(true);
        } else {
            setShowPersonalData(false);
        }
    };


    const confirmButtonClassName = `${styles.menu_item_confirm} ${isEmptyCart ? styles.empty_cart : ''}`;

    return (
        <>
            <div className={styles.cart}>
                <div onClick={onClose} className={styles.back_menu}>
                    <img src="./back.svg" alt="" />
                    <p className={styles.cancel}>back to menu</p>
                </div>

                <div className={styles.cart_items}>
                    {cart.dishes &&
                        cart.dishes.map((el) => (
                            <div className={styles.cart_item} key={el.title}>
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
                                    <button onClick={() => removeDish(el.title)} className={styles.menu_item_cancel}>
                                        <img src="./cancel.svg" alt="" />
                                    </button>
                                </div>
                            </div>
                        ))}

                    <div className={styles.cart_line}></div>
                    <div className={styles.cart_underline}>
                        <div className="cost">
                            <p className={styles.cart_summ_text}>Account amount:</p>
                            <p className={styles.cart_summ_price}>{cart.total}₴</p>
                        </div>
                        <button onClick={handleConfirmOrder} className={`${confirmButtonClassName} ${styles.menu_item_confirm}`}>
                            <p>{isEmptyCart ? 'Корзина пуста' : 'Оформить'}</p>
                        </button>
                    </div>
                    {showPersonalData && (
                        <PersonalData onSave={handleSave} onClose={handlePersonalDataClose} />
                    )}
                </div>
            </div>
        </>
    );
};

export default Cart;
