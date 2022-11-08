import FormWrapper from "./FormWrapper"

type AccountData = {
    email: string
    password: string
}

type AccountFormProps = AccountData & {
    updateFileds: (fields: Partial<AccountData>) => void
}

const AccountForm = ({ email, password, updateFileds }: AccountFormProps) => {
    return (
        <FormWrapper title="Account Creation">
            <label>Email</label>
            <input autoFocus required type="email" value={email} onChange={e => updateFileds({ email: e.target.value })} />
            <label>Password</label>
            <input autoComplete="on" required type="password" value={password} onChange={e => updateFileds({ password: e.target.value })} />
        </FormWrapper>
    )
}

export default AccountForm