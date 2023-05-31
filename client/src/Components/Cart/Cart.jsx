import React, { useContext, useEffect, useState } from 'react';
import styles from './Cart.module.scss';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import PersonalData from '../../Components/PersonalData/PersonalData'; // Импортируем компонент MyModal

const Cart = ({ open, onClose }) => {
    const [cartItemQuant, setCartItemQuant] = useState(0);
    const [cart, setCart] = useState([]);
    const { user } = useContext(UserContext);
    const [isEmptyCart, setIsEmptyCart] = useState(false);
    const [showPersonalData, setShowPersonalData] = useState(false);
    const [isPersonalDataFilled, setIsPersonalDataFilled] = useState(false); // Добавленное состояние
    const [personalData, setPersonalData] = useState(null); // Add personalData state variable
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const handlePersonalDataClose = () => {
        setShowPersonalData(false); // Сброс состояния при закрытии модального окна
    };


    const handleSave = async (data) => {
        console.log('Received data:', data);
        setPersonalData(data);
        setShowPersonalData(false);

        await createOrder(data);
        setIsOrderPlaced(true);
    };

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
                    title,
                    quantity: newQuantity,
                }
            );
            fetchCartItems();
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/cart/${user.cart_id}`);
            const data = response.data;
            const total = data.dishes.reduce(
                (acc, dish) => acc + dish.cost * dish.quantity,
                0
            );
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

    const createOrder = async (data1) => {
        try {
          const cartItemsResponse = await axios.get(`http://localhost:5000/cart/${user.cart_id}`);
          const cartItems = cartItemsResponse.data;
      
          if (cartItems.dishes.length === 0) {
            setIsEmptyCart(true);
            return;
          }
      
          const dataToSend = {
            userId: user._id,
            personalData: data1,
            cartItems: cartItems.dishes // Исправлено: передаем только массив dishes из cartItems
          };
      
          const response = await axios.post(`http://localhost:5000/cart/confirmOrder/${user.cart_id}`, dataToSend);
          if (response.status === 200) {
            fetchCartItems();
          } else {
            console.error('Ошибка при оформлении заказа:', response.status);
          }
      
          setPersonalData(null); // Reset personalData after placing the order
        } catch (error) {
          console.error('Ошибка при оформлении заказа:', error);
        }
      };
      

    const handleConfirmOrder = () => {
        if (!isEmptyCart && isPersonalDataFilled) {
            createOrder();
        }
        setShowPersonalData(true);
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
                        <PersonalData onSave={handleSave} onClose={() => setShowPersonalData(false)} />
                    )}
                </div>
            </div>
        </>
    );
};
export default Cart;