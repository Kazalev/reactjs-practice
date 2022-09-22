import { useEffect, useState } from "react"
import Card from "../UI/Card"
import classes from "./AvailableMeals.module.css"
import MealItem from "./MealItem/MealItem"

const AvailableMeals = () => {
    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [httpError, setHttpError] = useState(null)

    useEffect(() => {
        const fetchMeals = async () => {
            setIsLoading(true)
            let res = await fetch('https://react-http-70be7-default-rtdb.europe-west1.firebasedatabase.app/meals.json')
            if (!res.ok) throw new Error('Something went wrong!')
            let data = await res.json()

            const loadedMeals = []
            for (const key in data) {
                loadedMeals.push({ id: key, name: data[key].name, description: data[key].description, price: data[key].price })
            }

            setMeals(loadedMeals)
            setIsLoading(false)
        }

        fetchMeals().catch(err => {
            setIsLoading(false)
            setHttpError(err.message)
        })
    }, [])

    const mealsList = meals.map(meal => <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price} />)

    if (isLoading) return <section className={classes.MealsLoading}><p>Loading...</p></section>
    if (httpError) return <section className={classes.MealsError}><p>{httpError}</p></section>

    return <section className={classes.meals}>
        <Card>
            <ul>
                {mealsList}
            </ul>
        </Card>
    </section>
}

export default AvailableMeals