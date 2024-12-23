import {Link} from 'react-router-dom'
import './index.css'

const ProductCard = props => {
  const {productDetails} = props
  const {id, brand, imageUrl, price, rating, title} = productDetails

  return (
    <li className="productItem">
      <Link to={`/products/${id}`} className="product-link">
        <img src={imageUrl} alt={title} className="product_img" />
        <h1 className="product_title">{title}</h1>
        <p>by {brand}</p>
        <div className="price_rating">
          <p>Rs {price}/-</p>
          <p className="rating">
            {rating}
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="star"
            />
          </p>
        </div>
      </Link>
    </li>
  )
}

export default ProductCard
