import ExpensesFilter from "./ExpensesFilter"
import Card from "../UI/Card"
import "./Expenses.css"
import { useState } from "react"
import ExpensesList from "./ExpensesList"
import ExpensesChart from "./ExpensesChart"

const Expenses = (props) => {
    const [filteredYear, setFilteredYear] = useState('2020')

    const fitlerChangeHandler = year => {
        setFilteredYear(year)
    }

    const filteredExpenses = props.items.filter(expense => expense.date.getFullYear().toString() === filteredYear)

    return (
        <li>
            <Card className="expenses">
                <ExpensesFilter selected={filteredYear} onChangeFitler={fitlerChangeHandler} />
                <ExpensesChart expenses={filteredExpenses} />
                <ExpensesList items={filteredExpenses} />
            </Card>
        </li>
    )
}

export default Expenses