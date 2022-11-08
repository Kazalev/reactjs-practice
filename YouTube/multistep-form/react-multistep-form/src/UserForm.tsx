import FormWrapper from "./FormWrapper"

type UserData = {
    firstName: string
    lastName: string
    age: string
}

type UserFormProps = UserData & {
    updateFileds: (fields: Partial<UserData>) => void
}

const UserForm = ({ firstName, lastName, age, updateFileds }: UserFormProps) => {
    return (
        <FormWrapper title="User Details">
            <label>First Name</label>
            <input autoFocus required type="text" value={firstName} onChange={e => updateFileds({ firstName: e.target.value })} />
            <label>Last Name</label>
            <input required type="text" value={lastName} onChange={e => updateFileds({ lastName: e.target.value })} />
            <label>Age</label>
            <input required min={1} type="number" value={age} onChange={e => updateFileds({ age: e.target.value })} />
        </FormWrapper>
    )
}

export default UserForm