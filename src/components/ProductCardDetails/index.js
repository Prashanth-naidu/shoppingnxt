import {Link} from 'react-router-dom'
import {Component} from 'react'
// import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {CiSquareMinus, CiSquarePlus} from 'react-icons/ci'
import {ImSpinner2} from 'react-icons/im'
import ProductCard from '../ProductCard'
import CartContext from '../../context/CartContext'
import Header from '../Header'

import './index.css'

const apiStatus = {
  success: 'SUCCESS',
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class ProductCardDetails extends Component {
  state = {
    status: apiStatus.initial,
    productDetails: {},
    similarProducts: [],
    quantity: 1,
  }

  componentDidMount() {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    this.setState({status: apiStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const token = Cookies.get('jwt_Token')

    const url = `https://apis.ccbp.in/products/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log('succes')
    if (response.ok) {
      const productData = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        brand: data.brand,
        price: data.price,
        description: data.description,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
        similarProducts: data.similar_products.map(each => ({
          id: each.id,
          imageUrl: each.image_url,
          title: each.title,
          style: each.style,
          price: each.price,
          description: each.description,
          brand: each.brand,
          totalReviews: each.total_reviews,
          rating: each.rating,
          availability: each.availability,
        })),
      }

      this.setState({
        productDetails: productData,
        similarProducts: productData.similarProducts,
        status: apiStatus.success,
      })
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  onDecrement = () => {
    this.setState(prevState => ({quantity: prevState.quantity - 1}))
  }

  onIncrement = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  renderSuccessView = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList, addItem} = value
        const {productDetails, quantity, similarProducts} = this.state
        const {
          imageUrl,
          title,
          style,
          price,
          description,
          totalReviews,
          rating,
          availability,
          brand,
        } = productDetails

        const onClickAddToCart = () => {
          addItem({...productDetails, quantity})
        }
        return (
          <div className="product_cardContainer">
            <div className="product_card">
              <img src={imageUrl} alt={title} className="productCard_img" />
              <div className="productCard_descrip">
                <h1>{title}</h1>
                <p>Rs {price}/-</p>
                <div className="product_card_rating">
                  <p className="rating">
                    {rating}
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                      alt="star"
                      className="star_icon"
                    />
                  </p>
                  {totalReviews} Reviews
                </div>
                <p>{description}</p>
                <p>
                  Available: <span className="spanEle">{availability}</span>
                </p>
                <p>
                  Brand: <span className="spanEle">{brand}</span>
                </p>
                <hr />
                <div className="quantity_container">
                  <button
                    className="quantity_btn"
                    type="button"
                    onClick={this.onDecrement}
                  >
                    <CiSquareMinus className="quantity_icon" />
                  </button>
                  {quantity}
                  <button
                    className="quantity_btn"
                    type="button"
                    onClick={this.onIncrement}
                  >
                    <CiSquarePlus className="quantity_icon" />
                  </button>
                </div>
                <button
                  className="addToCard"
                  type="button"
                  onClick={onClickAddToCart}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
            <h1>Similar products</h1>
            <ul className="productList">
              {similarProducts.map(each => (
                <ProductCard productDetails={each} />
              ))}
            </ul>
          </div>
        )
      }}
    </CartContext.Consumer>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="error view"
      />
      <h1>Page Not Found</h1>
      <Link to="/products" className="product-link">
        <button type="button">Continue Shopping</button>
      </Link>
    </div>
  )

  renderLoadingView = () => (
    <div>
      <ImSpinner2 />
    </div>
  )

  renderView = () => {
    const {status} = this.state

    switch (status) {
      case apiStatus.success:
        return this.renderSuccessView()
      case apiStatus.failure:
        return this.renderFailureView()
      case apiStatus.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderView()}
      </div>
    )
  }
}

export default ProductCardDetails
