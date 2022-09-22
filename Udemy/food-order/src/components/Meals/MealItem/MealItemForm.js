import { useRef, useState } from 'react'
import Input from '../../UI/Input'
import classes from './MealItemForm.module.css'

const MealItemForm = props => {
    const [amountIsValid, setAmountIsValid] = useState(true)
    const amountInputRef = useRef()

    const submitHandler = event => {
        event.preventDefault()

        const enteredAmount = +amountInputRef.current.value
        console.log({ enteredAmount })
        if (enteredAmount === 0 || enteredAmount < 1 || enteredAmount > 5) { setAmountIsValid(false); return }

        props.onAddToCart(enteredAmount)
    }

    return <form className={classes.form} onSubmit={submitHandler}>
        <Input ref={amountInputRef} label="Amount" input={{ id: `amount_${props.id}`, type: 'number', min: '1', max: '5', step: '1', defaultValue: '1' }} />
        <button type='submit'>+ Add</button>
        {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
}

export default MealItemForm