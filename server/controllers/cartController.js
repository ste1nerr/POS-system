import Cart from '../models/Cart.js'
import Menu from '../models/Menu.js'
import CartModel from '../models/Cart.js'



export const addToCart = async (req, res) => {
    try {
        const { title, quantity } = req.body;
        const { menu_id } = req.params;
        console.log(menu_id);

        // Ищем меню по ID
        const menu = await Menu.findById(menu_id);
        if (!menu) {
            return res.status(404).json({ message: 'Меню не найдено' });
        }

        // Ищем блюдо в меню по названию
        const dish = menu.dishes.find((dish) => dish.title == title);
        if (!dish) {
            return res.status(404).json({ message: 'Блюдо не найдено в меню' });
        }

        // Ищем корзину
        let cart = await Cart.findOne();
        if (!cart) {
            // Если корзина не существует, создаем новую
            const newCart = new Cart({
                dishes: [{ title: dish.title, cost: dish.cost, quantity : 1 }],
                total: dish.cost * quantity,
            });
            await newCart.save();
            // Проверяем, что новая корзина успешно сохранена в базу данных
            cart = await Cart.findOne();
            if (!cart) {
                return res.status(500).json({ message: 'Не удалось создать корзину' });
            }
        } else {
            // Проверяем, есть ли блюдо уже в корзине
            const existingItemIndex = cart.dishes.findIndex((item) => item.title === dish.title);

            if (existingItemIndex !== -1) {
                // Если блюдо уже есть в корзине, увеличиваем его количество на заданную величину
                cart.dishes[existingItemIndex].quantity += quantity;
            } else {
                // Если блюда нет в корзине, добавляем его
                cart.dishes.push({ title: dish.title, cost: dish.cost,  quantity:quantity });
            }
            // Обновляем общую стоимость корзины
            // const totalPrice = cart.dishes.reduce((acc, item) => {
            //     const dishPrice = item.cost * item.quantity;
            //     return acc + dishPrice;
            // }, 0);
            // cart.total = totalPrice;
            // Сохраняем изменения в базу данных
            await cart.save();
        }
        res.json({ message: 'Блюдо добавлено в корзину' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne();
        if (!cart) {
            return res.status(404).json({ message: 'Корзина не найдена' });
        }
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};