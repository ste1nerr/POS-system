import axios from 'axios'
import styles from './Menu.module.scss'
import { useState, useEffect, useContext } from 'react'
import Cart from '../Cart/Cart';
import { UserContext } from '../../context/UserContext';


const Menu = () => {
  const [cart, setCart] = useState([]);
  const [menu, setMenu] = useState([]);
  const [openModal, setOpenModal] = useState(false)
  const { user } = useContext(UserContext)
  // console.log(user)

  useEffect(() => {
    fetchMenu();
    fetchCart();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await fetch(`http://localhost:5000/menu/${user.menu_id}`);
      const data = await response.json();
      setMenu(data.menu.dishes);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/cart/${user.cart_id}`);
      const data = response.data;
      setCart(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async (item) => {
    try {
      const response = await fetch(`http://localhost:5000/cart/add/${user.menu_id}/${user.cart_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      const data = await response.json();
      fetchCart(); // Обновляем данные корзины после добавления элемента
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <>

      <div className="container">
        <header>
          <p className={styles.menu_title}>Menu</p>
          <div className={styles.icons_menu}>
            <a onClick={async () => { await  setOpenModal(true); fetchCart();}}>
              <img src="./basket-icon.svg" alt="" className={styles.menu_basket} />
            </a>
            <Cart open={openModal} onClose={() => setOpenModal(false)} />
            <a href="https://www.tutorialspoint.com"><img src="./profile-icon.svg" alt="" className={styles.menu_profile} /></a>
            {!!user}
            <div className={styles.username}>
              {user.fullname}
            </div>
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
            {!!user}
            <div className={styles.username}>
            </div>
            {menu.map((el) => (
              <div className={styles.menu_item}>
                <div className={styles.menu_item_text}>
                  <div className={styles.line}></div>
                  <div className={styles.menu_item_title}>{el.title}</div>
                  <div className={styles.menu_item_ingredients}>{el.compositions}</div>
                </div>
                <div className={styles.menu_item_numbers}>
                  <div className={styles.menu_item_weight}>{el.weight}g</div>
                  <div className={styles.menu_item_cost}>{el.cost}₴</div>
                  <button onClick={() => addToCart(el)}>
                    <img src="./plus.svg" alt="" className={styles.menu_item_plus} />
                  </button>
                </div>
              </div>
            )
            )}
          </div>
        </div>
      </div>

    </>
  )
}


export default Menu