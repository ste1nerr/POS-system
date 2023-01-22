import React from 'react'
import styles from './Menu.module.scss'
const Menu = () => {
    return (
        <>
            <div className="container">
                <header>
                    <p className={styles.menu_title}>Menu</p>
                    <div className={styles.icons_menu}>
                        <a href="https://www.tutorialspoint.com"><img src="./basket-icon.svg" alt="" className={styles.menu_basket} /></a>
                        <a href="https://www.tutorialspoint.com"><img src="./profile-icon.svg" alt="" className={styles.menu_profile} /> </a>
                    </div>
                </header>

                <div className={styles.under_title}>
                    <div className={styles.left_column}>
                        <p className={styles.menu_categorie}>Main</p>

                        <p className={styles.menu_categorie}>Garnish</p>

                        <p className={styles.menu_categorie}>Salads</p>

                        <p className={styles.menu_categorie}>Deserts</p>

                        <p className={styles.menu_categorie}>Drinks</p>
                    </div>

                    <div className={styles.menu_items}>
                        <div className={styles.menu_item}>
                            <div className={styles.menu_item_text}>
                                <div className={styles.line}></div>
                                <div className={styles.menu_item_title}>Brownie</div>
                                <div className={styles.menu_item_ingredients}>Dark chocolate Butter, Brown sugar, Egg, Wheat flour, Walnuts</div>
                            </div>
                            <div className={styles.menu_item_numbers}>
                                <div className={styles.menu_item_weight}>175g</div>
                                <div className={styles.menu_item_cost}>220₴</div>
                                <a href="https://www.tutorialspoint.com"><img src="./plus.svg" alt="" className={styles.menu_item_plus} /> </a>
                            </div>
                        </div>
                        <div className={styles.menu_item}>
                            <div className={styles.menu_item_text}>
                                <div className={styles.line}></div>
                                <div className={styles.menu_item_title}>Brownie</div>
                                <div className={styles.menu_item_ingredients}></div>
                            </div>
                            <div className={styles.menu_item_numbers}>
                                <div className={styles.menu_item_weight}>175g</div>
                                <div className={styles.menu_item_cost}>220₴</div>
                                <a href="https://www.tutorialspoint.com"><img src="./plus.svg" alt="" className={styles.menu_item_plus} /> </a>
                            </div>
                        </div>

                        <div className={styles.menu_item}>
                            <div className={styles.menu_item_text}>
                                <div className={styles.line}></div>
                                <div className={styles.menu_item_title}>Brownie</div>
                                <div className={styles.menu_item_ingredients}>Dark chocolate Butter, Brown sugar, Egg, Wheat flour, Walnuts</div>
                            </div>
                            <div className={styles.menu_item_numbers}>
                                <div className={styles.menu_item_weight}>175g</div>
                                <div className={styles.menu_item_cost}>220₴</div>
                                <a href="https://www.tutorialspoint.com"><img src="./plus.svg" alt="" className={styles.menu_item_plus} /> </a>
                            </div>
                        </div>


                        <div className={styles.menu_item}>
                            <div className={styles.menu_item_text}>
                                <div className={styles.line}></div>
                                <div className={styles.menu_item_title}>Brownie</div>
                                <div className={styles.menu_item_ingredients}>Dark chocolate Butter, Brown sugar, Egg, Wheat flour, Walnuts</div>
                            </div>
                            <div className={styles.menu_item_numbers}>
                                <div className={styles.menu_item_weight}>175g</div>
                                <div className={styles.menu_item_cost}>220₴</div>
                                <a href="https://www.tutorialspoint.com"><img src="./plus.svg" alt="" className={styles.menu_item_plus} /> </a>
                            </div>
                        </div>


                        <div className={styles.menu_item}>
                            <div className={styles.menu_item_text}>
                                <div className={styles.line}></div>
                                <div className={styles.menu_item_title}>Brownie</div>
                                <div className={styles.menu_item_ingredients}>Dark chocolate Butter, Brown sugar, Egg, Wheat flour, Walnuts</div>
                            </div>
                            <div className={styles.menu_item_numbers}>
                                <div className={styles.menu_item_weight}>175g</div>
                                <div className={styles.menu_item_cost}>220₴</div>
                                <a href="https://www.tutorialspoint.com"><img src="./plus.svg" alt="" className={styles.menu_item_plus} /> </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Menu