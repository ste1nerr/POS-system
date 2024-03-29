import Cart from '../models/Cart.js'
import Menu from '../models/Menu.js'
import Storage from '../models/Storage.js'
import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  try {
    const cart_id = req.params.cart_id;
    const { userId, personalData } = req.body;
    const currentDate = new Date();
    // Поиск корзины по идентификатору
    const cart = await Cart.findById(cart_id);
    if (!cart) {
      // Корзина не найдена
      return res.status(404).send('Корзина не найдена.');
    }
    // Найти максимальный orderNumber в существующих заказах пользователя
    const maxOrderNumber = await Order.findOne({ userId }, { orderNumber: 1 }).sort({ orderNumber: -1 }).limit(1);
    // Создание нового заказа на основе данных из корзины
    const orderNumber = maxOrderNumber ? maxOrderNumber.orderNumber + 1 : 1;
    const newOrder = new Order({
      orderNumber,
      dishes: cart.dishes,
      total: cart.total,
      userId, // Привязка заказа к пользователю
      firstname: personalData.firstName, // Сохранение firstname в заказе
      lastname: personalData.lastName, // Сохранение lastname в заказе
      street: personalData.street, // Сохранение street в заказе
      createdAt: currentDate,
    });
    // Обновление количества ингредиентов на складе
    for (const item of cart.dishes) {
      const compositions = item.compositions.split(',');
      for (const composition of compositions) {
        const [ingredientName, quantity] = composition.trim().split(' (');
        const ingredient = await Storage.findOne({ name: ingredientName });
        if (!ingredient) {
          console.log(`Ингредиент ${ingredientName} не найден на складе.`);
          return res.status(400).send(`Ингредиент ${ingredientName} не найден на складе.`);
        }
        const requiredQuantity = parseInt(quantity) * item.quantity; // Умножаем количество ингредиента на количество блюд
        if (ingredient.quantity < requiredQuantity) {
          console.log(`Недостаточно ингредиента ${ingredientName} на складе.`);
          return res.status(400).send(`Недостаточно ингредиента ${ingredientName} на складе.`);
        }
        ingredient.quantity -= requiredQuantity;
        await ingredient.save();
      }
    }
    // Сохранение нового заказа
    await newOrder.save();
    // Очистка корзины (удаление всех товаров из корзины)
    cart.dishes = [];
    cart.total = 0;
    await cart.save();
    res.send('Ваш заказ успешно оформлен.');
  } catch (error) {
    console.error('Ошибка при сохранении заказа:', error);
    res.status(500).send('Произошла ошибка при оформлении заказа.');
  }
};
export const findOrdersByUserId = async (req, res) => {
  const user_id = req.params.user_id; // Используйте cart_id из параметров маршрута
  try {
    const orders = await Order.find({ user_id: user_id }); // Используйте userId для поиска заказов
    res.json(orders);
  } catch (error) {
    console.error('Ошибка при поиске заказов по userId:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};