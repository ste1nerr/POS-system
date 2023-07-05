import Cart from '../models/Cart.js'
import Menu from '../models/Menu.js'



export const addToCart = async (req, res) => {
    try {
        const { title, quantity } = req.body;
        const { menu_id, cart_id } = req.params;

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
        let cart = await Cart.findById(cart_id);
        if (!cart) {
            // Если корзина не существует, создаем новую
            const newCart = new Cart({
                dishes: [{ title: dish.title, cost: dish.cost, quantity: 1, compositions: dish.compositions}],
                total: dish.cost * quantity,
            });
            await newCart.save();
            // Проверяем, что новая корзина успешно сохранена в базу данных
            cart = await Cart.findById(cart_id);
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
                cart.dishes.push({ title: dish.title, cost: dish.cost, quantity: quantity, compositions: dish.compositions});
            }

            // Обновляем общую сумму товаров в корзине
            cart.total = cart.dishes.reduce((total, item) => total + (item.cost * item.quantity), 0);
            console.log(cart)
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

export const getCartById = async (req, res) => {
    try {
        // Получить идентификатор корзины из запроса
        const cart_id = req.params.cart_id;
        // Найти корзину по идентификатору в базе данных
        const cart = await Cart.findById(cart_id);
        // Если корзина не найдена, вернуть ошибку
        if (!cart) {
            return res.status(404).json({
                error: 'Корзина не найдена'
            });
        }
        // Отправить ответ с информацией о корзине
        res.status(200).json({
            dishes: cart.dishes,
            total: cart.total
        });
    } catch (error) {
        // Если произошла ошибка, отправить ответ с сообщением об ошибке
        res.status(500).json({
            error: error.message
        });
    }
};

export const updateCart = async (req, res) => {
    try {
        const cart_id = req.params.cart_id;
        const title = req.body.title;
        const newQuantity = req.body.quantity;
        const cart = await Cart.findById(cart_id);

        // Находим блюдо в корзине
        const dish = cart.dishes.find((item) => item.title === title);
        if (!dish) {
            return res.status(404).json({ message: 'Dish not found in cart' });
        }

        // Обновляем количество блюда
        dish.quantity = newQuantity;
        cart.total = cart.dishes.reduce((total, item) => total + item.cost * item.quantity, 0); // Обновляем общую сумму
        await cart.save();

        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Cannot update cart' });
    }
};

export const removeDishFromCart = async (req, res) => {
    try {
        const cartId = req.params.cart_id;
        const title = req.body.title;

        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Находим индекс блюда в корзине
        const dishIndex = cart.dishes.findIndex((item) => item.title === title);
        if (dishIndex === -1) {
            return res.status(404).json({ message: 'Dish not found in cart' });
        }

        // Удаляем блюдо из массива dishes
        cart.dishes.splice(dishIndex, 1);

        //   // Пересчитываем общую стоимость корзины
        //   cart.total = cart.dishes.reduce((total, dish) => total + (dish.cost * dish.quantity), 0);

        await cart.save();

        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Cannot remove dish from cart' });
    }
};


export const checkEmptyOrNo = async (req, res) => {
    const cartId = req.params.cart_id; // Получение идентификатора корзины из URL-параметра

    try {
        // Получение корзины из базы данных по идентификатору
        const cart = await Cart.findById(cartId);

        if (cart.dishes.length > 0) {
            // Если в корзине есть элементы, отправляем сообщение об успехе
            res.status(200).json({ message: 'Корзина не пуста' });
        } else {
            // Если в корзине нет элементов, отправляем сообщение об ошибке
            res.status(404).json({ message: 'Корзина пуста' });
        }
    } catch (error) {
        // Обработка ошибок, возникающих при проверке корзины
        res.status(500).json({ message: 'Ошибка при проверке корзины' });
    }
}