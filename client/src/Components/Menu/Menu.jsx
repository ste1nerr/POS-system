import axios from 'axios'
import styles from './Menu.module.scss'
import { useState, useEffect } from 'react'
import Cart from '../Cart/Cart';



const Menu = () => {

    const [error, setError] = useState(null);
    const [dishes, setDishes] = useState([]);
    const [openModal, setOpenModal] = useState(false)




    useEffect(() => {
        (async () => {
            const data = await fetch('http://localhost:5000/dishes');
            var temp = await data.json();
            setDishes(temp)
            await console.log(dishes)
        })();
    }, []);



    return (
        <>
            <div className="container">


                <header>
                    <p className={styles.menu_title}>Menu</p>
                    <div className={styles.icons_menu}>
                        <a onClick={() => setOpenModal(true)}><img src="./basket-icon.svg" alt="" className={styles.menu_basket} /></a>
                        <Cart open = {openModal} onClose={()=> setOpenModal(false)}/>
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
                        {dishes.map((el) => (
                            <div className={styles.menu_item}>
                                <div className={styles.menu_item_text}>
                                    <div className={styles.line}></div>
                                    <div className={styles.menu_item_title}>{el.title}</div>
                                    <div className={styles.menu_item_ingredients}>{el.compositions}</div>
                                </div>
                                <div className={styles.menu_item_numbers}>
                                    <div className={styles.menu_item_weight}>{el.weight}g</div>
                                    <div className={styles.menu_item_cost}>{el.cost}₴</div>
                                    <a href="https://www.tutorialspoint.com"><img src="./plus.svg" alt="" className={styles.menu_item_plus} /> </a>
                                </div>
                            </div>
                        ))}




                    </div>
                </div>
            </div>

        </>
    )
}


export default Menu