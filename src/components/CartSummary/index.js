// Write your code here

import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      /* let totalAmount 
            cartList.forEach(eachItem=>eachItem.)  */

      let totalAmount = 0
      cartList.forEach(eachItem => {
        totalAmount += eachItem.price * eachItem.quantity
      })
      const totalItems = cartList.length

      return (
        <div className="orderTotalBox">
          <h1 className="totalHeading">
            Order Total: <span className="priceSpan">Rs {totalAmount}/-</span>
          </h1>
          <p className="itemsInCart">{totalItems} items in cart</p>
          <button className="checkoutButton" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
