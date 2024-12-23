import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_Token')
    history.replace('/')
  }
  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length

        return (
          <>
            {cartItemsCount > 0 ? (
              <span className="cart-count-badge">{cartList.length}</span>
            ) : null}
          </>
        )
      }}
    </CartContext.Consumer>
  )
  return (
    <nav className="nav_bar">
      <div className="nav_container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website logo"
            className="logo_img"
          />
        </Link>
        <ul className="unorderList">
          <Link to="/" className="nav_links">
            <li>Home</li>
          </Link>
          <Link to="/products" className="nav_links">
            <li>Products</li>
          </Link>
          <Link to="/cart" className="nav_links">
            <li>Cart {renderCartItemsCount()}</li>
          </Link>
          <li>
            <button
              type="button"
              className="logout_btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
      <div className="mobile_view">
        <div className="main_heading">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website logo"
            className="mobile_img"
          />
          <button type="button" className="logout_btn" onClick={onClickLogout}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
              alt="nav logout"
              className="icon_img"
            />
          </button>
        </div>
        <div className="icons">
          <Link to="/" className="nav_links">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
              alt="nav home"
              className="icon_img"
            />
          </Link>
          <Link to="/products" className="nav_links">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
              alt="nav products"
              className="icon_img"
            />
          </Link>
          <Link to="/cart" className="nav_links">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
              alt="nav cart"
              className="icon_img"
            />
            {renderCartItemsCount()}
          </Link>
        </div>
      </div>
    </nav>
  )
}
export default withRouter(Header)
