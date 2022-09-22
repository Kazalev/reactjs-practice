import { useRef, useState } from "react"
import Button from "../UI/Button"
import Card from "../UI/Card"
import ErrorModal from "../UI/ErrorModal"
import classes from "./AddUser.module.css"

const AddUser = props => {
    const nameInputRef = useRef()
    const ageInputRef = useRef()

    // const [username, setUsername] = useState('')
    // const [age, setAge] = useState('')
    const [error, setError] = useState(null)

    const addUserHandler = e => {
        e.preventDefault()

        const username = nameInputRef.current.value
        const age = ageInputRef.current.value

        if (username.trim().length === 0 || age.trim().length === 0) {
            setError({ title: 'Invalid input', message: "Please enter a valid name and age (non-empty values)." })
            return
        }
        if (+age < 1) {
            setError({ title: 'Invalid age', message: "Please enter a valid age (> 0)." })
            return
        }

        console.log({ username, age })

        props.onAddUser(username, age)
        // setUsername('')
        // setAge('')
        nameInputRef.current.value = ''
        ageInputRef.current.value = ''
    }

    const errorHandler = () => {
        setError(null)
    }

    return (
        <>
            {error && <ErrorModal title={error.title} message={error.message} onCloseModal={errorHandler} />}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    {/* value={username} onChange={e => setUsername(e.target.value)} */}
                    <input id="username" type="text" ref={nameInputRef} />

                    <label htmlFor="age">Age (Years)</label>
                    {/* value={age} onChange={e => setAge(e.target.value)}  */}
                    <input id="age" type="number" ref={ageInputRef} />

                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </>
    )
}

export default AddUser