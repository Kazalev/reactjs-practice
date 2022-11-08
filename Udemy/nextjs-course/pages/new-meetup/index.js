import Head from 'next/head'
import { useRouter } from 'next/router'
import NewMeetupForm from '../../components/meetups/NewMeetupForm'

const NewMeetupPage = () => {
    const router = useRouter()

    const addMeetupHandler = async (enteredMeetupData) => {
        let otps = { method: 'POST', body: JSON.stringify(enteredMeetupData), headers: { 'Content-Type': 'application/json' } }

        const data = await fetch('/api/new-meetup', otps).then(res => res.json())
        console.log(data)
        router.push('/')
    }

    return (
        <>
            <Head>
                <title>Add a New Meetup</title>
                <meta name="description" content='Add your own meetups and create amazing networking opportunities.' />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </>
    )
}

export default NewMeetupPage