import {Component} from 'react'
import {TailSpin} from 'react-loader-spinner'
import Cookies from 'js-cookie'

import ProductCard from '../ProductCard'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class PrimeDealsSection extends Component {
  state = {
    primeDealProducts: [],
    status: apiStatus.initial,
  }

  componentDidMount() {
    this.getPrimeDeals()
  }

  getPrimeDeals = async () => {
    this.setState({status: apiStatus.inProgress})
    const token = Cookies.get('jwt_Token')
    const url = 'https://apis.ccbp.in/prime-deals'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const deals = data.prime_deals.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
        description: each.description,
        price: each.price,
        rating: each.rating,
        style: each.style,
        title: each.title,
        totalReviews: each.total_reviews,
        availability: each.availability,
        brand: each.brand,
      }))

      this.setState({primeDealProducts: deals, status: apiStatus.success})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {primeDealProducts} = this.state
    return (
      <div>
        <h1 className="Products_Heading">Exclusive Deals</h1>
        <ul className="productList">
          {primeDealProducts.map(each => (
            <ProductCard key={each.id} productDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div>
      <h1>Exclusive Prime Deals</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
        alt="Register Prime"
        className="exclusive_Img"
      />
    </div>
  )

  renderLoaderView = () => (
    <div className="loading_display">
      <TailSpin type="ThreeDots" color="blue" height="50" width="50" />
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
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return <div className="product_container">{this.renderView()}</div>
  }
}

export default PrimeDealsSection
