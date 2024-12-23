import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <div>
    <Header />
    <div className="home_container">
      <div className="description">
        <h1 className="description_heading">Clothes That Get YOU Noticed</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
          alt="clothes that get you noticed"
          className="clothes_img_mobile"
        />
        <p>
          Fashion is part of the daily air and it does not quite help that is
          changes all the time. Fashion is a part of daily air and it does not
          quite help that is changes all the time. Fashion is a part of daily
          air and it does not quite help that is changes all the time.
        </p>
        <Link to="/products">
          <button type="button" className="shop_btn">
            Shop Now
          </button>
        </Link>
      </div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
        alt="clothes that get you noticed"
        className="clothes_img_screen"
      />
    </div>
  </div>
)

export default Home
