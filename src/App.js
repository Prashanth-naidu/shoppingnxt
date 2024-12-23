import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Products from './components/Products'
import ProtectedRoute from './components/ProtectedRoute'
import ProductCardDetails from './components/ProductCardDetails'
import Cart from './components/Cart'
import CartContext from './context/CartContext'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAll = () => {
    this.setState({cartList: []})
  }

  decrementQuantity = id => {
    const {cartList} = this.state
    const item = cartList.find(eachItem => eachItem.id === id)
    if (item.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (id === each.id) {
            const updatedQuantity = each.quantity - 1
            return {...each, quantity: updatedQuantity}
          }
          return each
        }),
      }))
    } else {
      this.deleteItem(id)
    }
  }

  incrementQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        if (id === each.id) {
          const updatedQuantity = each.quantity + 1
          return {...each, quantity: updatedQuantity}
        }
        return each
      }),
    }))
  }

  deleteItem = id => {
    const {cartList} = this.state
    const updateCartList = cartList.filter(each => each.id !== id)
    this.setState({cartList: updateCartList})
  }

  addItem = product => {
    const {cartList} = this.state
    const item = cartList.find(each => each.id === product.id)

    if (item) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (eachItem.id === product.id) {
            const updatedQuantity = product.quantity + eachItem.quantity
            return {...eachItem, quantity: updatedQuantity}
          }
          return eachItem
        }),
      }))
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addItem: this.addItem,
          deleteItem: this.deleteItem,
          incrementQuantity: this.incrementQuantity,
          decrementQuantity: this.decrementQuantity,
          removeAll: this.removeAll,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductCardDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
