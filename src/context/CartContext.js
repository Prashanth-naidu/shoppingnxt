import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addItem: () => {},
  deleteItem: () => {},
  incrementQuantity: () => {},
  decrementQuantity: () => {},
  removeAll: () => {},
})

export default CartContext
