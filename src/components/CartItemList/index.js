import {
  ListContainer,
  UnorderedList,
  RemoveAll,
  Heading,
} from './styledComponents'
import CartContext from '../../context/CartContext'
import CartItem from '../CartItem'

const CartItemList = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAll} = value

      const onClickRemoveAll = () => {
        removeAll()
      }
      return (
        <ListContainer>
          <Heading>My Cart</Heading>
          <RemoveAll onClick={onClickRemoveAll}>Remove All</RemoveAll>
          <UnorderedList>
            {cartList.map(each => (
              <CartItem key={each.id} listItem={each} />
            ))}
          </UnorderedList>
        </ListContainer>
      )
    }}
  </CartContext.Consumer>
)

export default CartItemList
