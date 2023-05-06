import React from 'react'
import { useState } from 'react'
import styles from './Cart.module.scss'

const Cart = ({ open, onClose }) => {
    const [cartItemQuant, setCartItemQuant] = useState(0);
    if (!open) return null


    function increment() {
        setCartItemQuant(prevQuant => prevQuant + 1);
    }

    function decrement() {
        if (cartItemQuant > 0) {
            setCartItemQuant(prevQuant => prevQuant - 1);
        }
    }
    return (
        <>
            <div className={styles.cart}>
                <div onClick={onClose} className={styles.back_menu}>
                    <img src="./back.svg" alt="" />
                    <p className={styles.cancel}>back to menu</p>
                </div>


                <div className={styles.cart_items}>
                    <div className={styles.cart_item}>
                        <div className={styles.cart_item_text}>
                            <div className={styles.cart_item_title}>Brownie</div>
                            <div className={styles.cart_item_subtitle}>Dark chocolate Butter, Brown sugar, Egg, Wheat flour, Walnuts</div>
                        </div>
                        <div className={styles.menu_item_numbers}>
                            <div className={styles.cart_item_weight}>175g</div>
                            <div className={styles.cart_item_controller}>
                                <button type="button" onClick={decrement} className={styles.cart_item_minus}>-</button>
                                <p className={styles.cart_item_quant}>{cartItemQuant}</p>
                                <button type="button" onClick={increment} className={styles.cart_item_plus}>+</button>
                            </div>
                            <div className={styles.cart_item_cost}>220₴</div>
                            <a><img src="./cancel.svg" alt="" className={styles.menu_item_cancel} /> </a>
                        </div>
                    </div>


                    <div className={styles.cart_line}></div>
                    <div className={styles.cart_underline}>
                        <p className={styles.cart_summ_text}>Account amount:</p>
                        <p className={styles.cart_summ_price}>3300₴</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Cart