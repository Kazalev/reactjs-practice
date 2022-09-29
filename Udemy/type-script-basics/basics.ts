// Primitives (number, string, boolean)
let age: number = 23
age = 12

let userName: string = 'test'
userName = 'Kris'

let isActive: boolean = false
isActive = true


// More complex types (arrays, objects)
let hobbies: string[]
hobbies = ['Sports', 'Cooking']

// Type aliases
type Person = { name: string, age: number }

let person: Person
person = { name: 'Kris', age: 20 }
// person = { isActive: true }

let people: Person[] // { name: string, age: number }[]
people = [
    { name: 'Kris', age: 20 },
    { name: 'Pesho', age: 25 }
]


// Type inference
let course = 'React complete guide' // No need to specifically set it to string
// course = 123123

// Multiple types
let courses: string | number = 'React complete guide'
courses = 123123


// Functions & types
function add(a: number, b: number) {
    return a + b
}

function printOutput(value: any) {
    console.log(value)
}


// Generics
function insertAtBeginnig<T>(array: T[], value: T) {
    const newArray = [value, ...array]
    return newArray
}

const demoArray = [1, 2, 3]
const updatedArray = insertAtBeginnig(demoArray, -1) // [-1, 1, 2, 3]

const demoStringArray = ['1','2', '3']
const stringArray = insertAtBeginnig(demoStringArray, '-1')

// updatedArray[0].split('')
stringArray[0].split('')