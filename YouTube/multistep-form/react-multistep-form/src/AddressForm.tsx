import FormWrapper from "./FormWrapper"

type AddressData = {
    street: string
    city: string
    state: string
    zip: string
}

type AddressFormProps = AddressData & {
    updateFileds: (fields: Partial<AddressData>) => void
}

const AddressForm = ({ street, city, state, zip, updateFileds }: AddressFormProps) => {
    return (
        <FormWrapper title="Address">
            <label>Street</label>
            <input autoFocus required type="text" value={street} onChange={e => updateFileds({ street: e.target.value })} />
            <label>City</label>
            <input required type="text" value={city} onChange={e => updateFileds({ city: e.target.value })} />
            <label>State</label>
            <input required type="text" value={state} onChange={e => updateFileds({ state: e.target.value })} />
            <label>Zip</label>
            <input required type="text" value={zip} onChange={e => updateFileds({ zip: e.target.value })} />
        </FormWrapper>
    )
}

export default AddressForm