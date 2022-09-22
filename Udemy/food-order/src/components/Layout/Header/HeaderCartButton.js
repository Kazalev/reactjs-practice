import { useContext, useEffect, useState } from "react"
import CartContext from "../../../store/cart-context"
import CartIcon from "../../Cart/CartIcon"
import classes from "./HeaderCartButton.module.css"

const HeaderCartButton = (props) => {
    const cartCtx = useContext(CartContext)
    const [btnIsHighLighted, setBtnIsHighLighted] = useState(false)
    const { items } = cartCtx

    const numberOfCartItems = items.reduce((currentNumber, item) => currentNumber + item.amount, 0)

    const btnClasses = `${classes.button} ${btnIsHighLighted ? classes.bump : ''}`

    useEffect(() => {
        if (cartCtx.items.length === 0) return
        setBtnIsHighLighted(true)

        const timer = setTimeout(() => setBtnIsHighLighted(false), 300)

        return () => {
            clearTimeout(timer)
        }
    }, [items])

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
}

export default HeaderCartButton