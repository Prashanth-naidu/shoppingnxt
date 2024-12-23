import AllProductsSection from '../AllProductsSection'
import PrimeDealsSection from '../PrimeDealsSection'
import ProductCardDetails from '../ProductCardDetails'
import Header from '../Header'
import './index.css'

const Products = () => (
  <div>
    <Header />
    <div className="">
      <PrimeDealsSection />
      <AllProductsSection />
    </div>
  </div>
)

export default Products
