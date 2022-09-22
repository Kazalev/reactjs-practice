import { cartActions } from "./cart-slice"
import { uiActions } from "./ui-slice"

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('https://react-http-70be7-default-rtdb.europe-west1.firebasedatabase.app/cart.json')
            if (!response.ok) throw new Error('Could not fetch cart data.')
            const data = await response.json()
            return data
        }

        try {
            const cartData = await fetchData()
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity
            }))
            // dispatch(uiActions.showNotification({ status: 'success', title: 'Success!', message: 'Send cart successfully!' }))
        }
        catch (error) {
            dispatch(uiActions.showNotification({ status: 'error', title: 'Error!', message: 'Fetching cart faild!' }))
        }
    }
}

export const sendCartData = cart => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({ status: 'pending', title: 'Sending...', message: 'Sending cart data' }))

        const sendRequest = async () => {
            let res = await fetch('https://react-http-70be7-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
                method: 'PUT',
                body: JSON.stringify({ items: cart.items, totalQuantity: cart.totalQuantity })
            })
            if (!res.ok) throw new Error('Sending cart data faild.')
        }

        try {
            await sendRequest()
            dispatch(uiActions.showNotification({ status: 'success', title: 'Success!', message: 'Send cart successfully!' }))
        } catch (error) {
            dispatch(uiActions.showNotification({ status: 'error', title: 'Error!', message: 'Send cart faild!' }))
        }
    }
}