import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Cart from './components/Cart/Cart'
import Layout from './components/Layout/Layout'
import Products from './components/Shop/Products'
import Notification from './components/UI/Notification'
import { fetchCartData, sendCartData } from './store/cart-actions'
// import { uiActions } from './store/ui-slice'

let isInitialRender = true

function App() {
  const dispatch = useDispatch()
  const showCart = useSelector(state => state.ui.cartIsVisible)
  const cart = useSelector(state => state.cart)
  const notification = useSelector(state => state.ui.notification)

  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch])

  useEffect(() => {
    if (isInitialRender) { isInitialRender = false; return }
    // (async () => {
    // dispatch(uiActions.showNotification({ status: 'pending', title: 'Sending...', message: 'Sending cart data' }))
    // let res = await fetch('https://react-http-70be7-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
    //   method: 'PUT',
    //   body: JSON.stringify(cart)
    // })

    // if (!res.ok) throw new Error('Sending cart data faild.')

    // dispatch(uiActions.showNotification({ status: 'success', title: 'Success!', message: 'Send cart successfully!' }))
    // })().catch(error => {
    //   dispatch(uiActions.showNotification({ status: 'error', title: 'Error!', message: 'Send cart faild!' }))
    // })
    if (cart.changed) dispatch(sendCartData(cart))
  }, [cart, dispatch])

  return (
    <>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  )
}

export default App