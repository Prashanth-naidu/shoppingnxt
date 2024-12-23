import Popup from 'reactjs-popup'
import {withRouter} from 'react-router-dom'

import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = props => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAll} = value
      let totalPrice = 0

      cartList.forEach(each => {
        totalPrice += each.price * each.quantity
      })
      const onClickContinue = () => {
        const {history} = props
        removeAll()
        history.replace('/')
      }
      return (
        <div className="summary">
          <h1>Cart Summary</h1>
          <p>Rs {totalPrice}/-</p>
          <Popup
            modal
            trigger={<button className="continueBtn">Buy</button>}
            className="popup_content"
          >
            {close => (
              <div className="modal_container">
                <h1>Thank you</h1>
                <button className="continueBtn" onClick={onClickContinue}>
                  Continue Shopping
                </button>
              </div>
            )}
          </Popup>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default withRouter(CartSummary)
