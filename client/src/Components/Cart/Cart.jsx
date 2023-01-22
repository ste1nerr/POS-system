import React from 'react'
import styles from './Cart.module.scss'

const Cart = () => {
    return (
        <>
            <div className={styles.cart}>
                <div className={styles.cart_items}>
                    <div className={styles.cart_item}>
                        <div className={styles.cart_item_text}>
                            <div className={styles.cart_item_title}>Brownie</div>
                            <div className={styles.cart_item_subtitle}>Dark chocolate Butter, Brown sugar, Egg, Wheat flour, Walnuts</div>
                        </div>
                        <div className={styles.menu_item_numbers}>
                            <div className={styles.cart_item_weight}>175g</div>
                            <div className={styles.cart_item_controller}>
                                <a href="" className={styles.cart_item_minus}>-</a>
                                <p href="" className={styles.cart_item_quant}>0</p>
                                <a href="" className={styles.cart_item_plus}>+</a>
                            </div>
                            <div className={styles.cart_item_cost}>220₴</div>
                            <a href="https://www.tutorialspoint.com"><img src="./cancel.svg" alt="" className={styles.menu_item_cancel} /> </a>
                        </div>
                    </div>

                    <div className={styles.cart_item}>
                        <div className={styles.cart_item_text}>
                            <div className={styles.cart_item_title}>Brownie</div>
                            <div className={styles.cart_item_subtitle}>Dark chocolate Butter, Brown sugar, Egg, Wheat flour, Walnuts</div>
                        </div>
                        <div className={styles.menu_item_numbers}>
                            <div className={styles.cart_item_weight}>175g</div>
                            <div className={styles.cart_item_controller}>
                                <a href="" className={styles.cart_item_minus}>-</a>
                                <p href="" className={styles.cart_item_quant}>0</p>
                                <a href="" className={styles.cart_item_plus}>+</a>
                            </div>
                            <div className={styles.cart_item_cost}>220₴</div>
                            <a href="https://www.tutorialspoint.com"><img src="./cancel.svg" alt="" className={styles.menu_item_cancel} /> </a>
                        </div>
                    </div>


                    <div className={styles.cart_item}>
                        <div className={styles.cart_item_text}>
                            <div className={styles.cart_item_title}>Brownie</div>
                            <div className={styles.cart_item_subtitle}>Dark chocolate Butter, Brown sugar, Egg, Wheat flour, Walnuts</div>
                        </div>
                        <div className={styles.menu_item_numbers}>
                            <div className={styles.cart_item_weight}>175g</div>
                            <div className={styles.cart_item_controller}>
                                <a href="" className={styles.cart_item_minus}>-</a>
                                <p href="" className={styles.cart_item_quant}>0</p>
                                <a href="" className={styles.cart_item_plus}>+</a>
                            </div>
                            <div className={styles.cart_item_cost}>220₴</div>
                            <a href="https://www.tutorialspoint.com"><img src="./cancel.svg" alt="" className={styles.menu_item_cancel} /> </a>
                        </div>
                    </div>

                    <div className={styles.cart_item}>
                        <div className={styles.cart_item_text}>
                            <div className={styles.cart_item_title}>Brownie</div>
                            <div className={styles.cart_item_subtitle}>Dark chocolate Butter, Brown sugar, Egg, Wheat flour, Walnuts</div>
                        </div>
                        <div className={styles.menu_item_numbers}>
                            <div className={styles.cart_item_weight}>175g</div>
                            <div className={styles.cart_item_controller}>
                                <a href="" className={styles.cart_item_minus}>-</a>
                                <p href="" className={styles.cart_item_quant}>0</p>
                                <a href="" className={styles.cart_item_plus}>+</a>
                            </div>
                            <div className={styles.cart_item_cost}>220₴</div>
                            <a href="https://www.tutorialspoint.com"><img src="./cancel.svg" alt="" className={styles.menu_item_cancel} /> </a>
                        </div>
                    </div>

                    <div className={styles.cart_line}></div>
                    <div className={styles.cart_underline}>
                        <p className={styles.cart_summ_text}>Account amount:</p>
                        <p className={styles.cart_summ_price}>3300</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Cart