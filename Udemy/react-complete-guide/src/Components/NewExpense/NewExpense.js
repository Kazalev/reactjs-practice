import React from "react" // No need to added it here, but it might still be the case for old React projects
import "./NewExpense.css"
import ExpenseForm from "./ExpenseForm"
import { useState } from "react"

const NewExpense = (props) => {
    const [isEditing, setIsEditing] = useState(false)

    const onSaveExpenseDataHandler = (enteredExpenseData) => {
        const expensedData = { ...enteredExpenseData, id: Math.random().toString() }
        props.onAddExpense(expensedData)
        setIsEditing(false)
    }

    const stopEditingHandler = () => setIsEditing(false)

    return <div className="new-expense">
        {!isEditing && <button onClick={() => setIsEditing(true)}>Add New Expense</button>}
        {isEditing && <ExpenseForm onSaveExpenseData={onSaveExpenseDataHandler} onCancel={stopEditingHandler} />}
    </div>
}

export default NewExpense