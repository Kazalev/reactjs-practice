import ExpenseDate from './ExpenseDate'
import Card from '../UI/Card'
import './ExpenseItem.css'
import { useState } from 'react'

const ExpenseItem = ({ title, date, amount }) => {
    const [newTitle, setNewTitle] = useState(title)

    return (
        <Card className='expense-item'>
            <ExpenseDate date={date} />
            <div className='expense-item__description'>
                <h2>{newTitle}</h2>
                <div className='expense-item__price'>${amount}</div>
            </div>
        </Card>
    )
}

export default ExpenseItem