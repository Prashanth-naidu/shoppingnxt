import {CiSquareMinus, CiSquarePlus} from 'react-icons/ci'
import {MdDeleteForever} from 'react-icons/md'
import CartContext from '../../context/CartContext'

import './index.css'

import {
  ListItem,
  ImageEle,
  ProductDetails,
  FirstPart,
  Title,
  Brand,
  SecondPart,
  QuantityDetails,
  IconBtn,
  Quantity,
  Price,
  DeleteIcon,
} from './styledComponents'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        cartList,
        deleteItem,
        incrementQuantity,
        decrementQuantity,
        removeAll,
      } = value
      const {listItem} = props
      const {imageUrl, id, title, brand, quantity, price} = listItem

      const onClickPlus = () => {
        incrementQuantity(id)
      }

      const onClickMinus = () => {
        decrementQuantity(id)
      }

      const onClickInto = () => {
        deleteItem(id)
      }

      return (
        <div>
          <ListItem>
            <FirstPart>
              <ImageEle src={imageUrl} />
              <ProductDetails>
                <Title>{title}</Title>
                <Brand>{brand}</Brand>
              </ProductDetails>
            </FirstPart>
            <SecondPart>
              <QuantityDetails>
                <IconBtn type="button" onClick={onClickMinus}>
                  <CiSquareMinus className="icon" />
                </IconBtn>
                <Quantity>{quantity}</Quantity>
                <IconBtn type="button" onClick={onClickPlus}>
                  <CiSquarePlus className="icon" />
                </IconBtn>
              </QuantityDetails>
              <Price>{price * quantity}</Price>
              <DeleteIcon onClick={onClickInto}>
                <MdDeleteForever />
              </DeleteIcon>
            </SecondPart>
          </ListItem>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartItem
