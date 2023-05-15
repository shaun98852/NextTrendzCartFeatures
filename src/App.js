import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state

    const finalList = cartList.map(eachItem => {
      if (eachItem.id === id) {
        const newItem = {...eachItem, quantity: eachItem.quantity + 1}
        return newItem
      }
      return eachItem
    })

    this.setState({cartList: finalList})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const requiredList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: requiredList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const element = cartList.find(eachItem => eachItem.id === id)
    const requiredQuantity = element.quantity
    if (requiredQuantity > 1) {
      const newList = cartList.map(eachItem => {
        if (eachItem.id === id) {
          const newItem = {...eachItem, quantity: eachItem.quantity - 1}
          return newItem
        }
        return eachItem
      })

      this.setState({cartList: newList})
    } else if (requiredQuantity === 1) {
      const requiredList = cartList.filter(eachItem => eachItem.id !== id)
      this.setState({cartList: requiredList})
    }
  }

  addCartItem = product => {
    //   TODO: Update the code here to implement addCartItem
    const {cartList} = this.state
    const findObject = cartList.find(eachItem => eachItem.id === product.id)

    if (findObject === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      this.incrementCartItemQuantity(product.id)
    }
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
