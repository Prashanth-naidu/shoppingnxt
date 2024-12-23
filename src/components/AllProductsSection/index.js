import {Component} from 'react'
import Cookies from 'js-cookie'
import ProductCard from '../ProductCard'
import ProductHeader from '../ProductHeader'
import './index.css'

const sortOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'High Price',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Low Price',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    activeOptionId: sortOptions[1].optionId,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const {activeOptionId} = this.state
    const token = Cookies.get('jwt_Token')
    const url = `https://apis.ccbp.in/products?sort_by=${activeOptionId}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const productsDetails = data.products.map(each => ({
        id: each.id,
        brand: each.brand,
        imageUrl: each.image_url,
        price: each.price,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({productsList: productsDetails})
    }
  }

  updateActiveOption = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  render() {
    const {productsList, activeOptionId} = this.state
    return (
      <div className="product_container">
        <ProductHeader
          activeOptionId={activeOptionId}
          sortByOptions={sortOptions}
          updateActiveOption={this.updateActiveOption}
        />
        <ul className="productList">
          {productsList.map(each => (
            <ProductCard key={each.id} productDetails={each} />
          ))}
        </ul>
      </div>
    )
  }
}

export default AllProductsSection
