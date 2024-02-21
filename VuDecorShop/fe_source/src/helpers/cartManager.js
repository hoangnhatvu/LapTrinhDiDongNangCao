import AsyncStorage from '@react-native-async-storage/async-storage';

class CartManager {
  static async addToCart(product, quantity, option) {
    try {
      const cartItems = await AsyncStorage.getItem('cart');

      let updatedCart = [];

      if (cartItems) {
        updatedCart = JSON.parse(cartItems);
      }
      console.log(product.product_id)

      const existingItemIndex = updatedCart.findIndex(
        item => item.id === (product.product_id === undefined ? product.id + option.id : product.id),
      );

      if (existingItemIndex !== -1) {
        updatedCart[existingItemIndex].quantity += quantity;
      } else {
        updatedCart.push({
          id: product.id + option.id,
          product_id: product.id,
          option: option,
          productName: product.product_name,
          price: option.price,
          size: option.size,
          color: option.size,
          categoryName: product.category.category_name,
          image: option.option_image
            ? option.option_image
            : product.product_image,
          quantity,
        });
      }

      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      throw error;
    }
  }

  static async getCartItems() {
    try {
      const cartItems = await AsyncStorage.getItem('cart');

      if (cartItems) {
        return JSON.parse(cartItems);
      }

      return [];
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sản phẩm trong giỏ hàng:', error);
      return [];
    }
  }

  static async removeFromCart(product) {
    try {
      const cartItems = await AsyncStorage.getItem('cart');

      if (cartItems) {
        let updatedCart = JSON.parse(cartItems);
        updatedCart = updatedCart.filter(item => item.id !== product.id);

        await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
        console.log('Sản phẩm đã được xóa khỏi giỏ hàng');
      }
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
    }
  }

  static async removeCartItem(product) {
    try {
      const cartItems = await AsyncStorage.getItem('cart');
      let updatedCart = [];
      if (cartItems) {
        updatedCart = JSON.parse(cartItems);
      }
      const existingItemIndex = updatedCart.findIndex(
        item => item.id === product.id,
      );
      if (existingItemIndex !== -1) {
        updatedCart[existingItemIndex].quantity -= 1;
      }
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  }
  
  static async clearCart() {
    try {
      await AsyncStorage.removeItem('cart');
      console.log('Giỏ hàng đã được xóa');
    } catch (error) {
      console.error('Lỗi khi xóa giỏ hàng:', error);
    }
  }
}

export default CartManager;
