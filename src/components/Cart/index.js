import Header from '../Header'
import {
  CartContainer,
  Container,
  NoProductContainer,
  NoProduct,
} from './styledComponents'
import CartItemList from '../CartItemList'
import CartContext from '../../context/CartContext'
import CartSummary from '../CartSummary'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const isEmpty = cartList.length === 0
      return (
        <Container>
          <Header />
          <CartContainer>
            {isEmpty ? (
              <NoProductContainer>
                <NoProduct>No Products </NoProduct>
              </NoProductContainer>
            ) : (
              <>
                <CartItemList />
                <CartSummary />
              </>
            )}
          </CartContainer>
        </Container>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
