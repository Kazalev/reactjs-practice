import Head from 'next/head'
import { MongoClient } from "mongodb"
import MeetupList from "../components/meetups/MeetupList"

const HomePage = ({ meetups }) => {
    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta name="description" content='Browse a huge list of highly active React meetups!' />
            </Head>
            <MeetupList meetups={meetups} />
        </>
    )
}

export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://Kazalev:oS7dXb8yqVORYrDu@softuni.jyv2w.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db()
    const meetupsCollection = db.collection('meetups')
    const meetups = await meetupsCollection.find().toArray()
    client.close()

    return {
        props: {
            meetups: meetups.map(meetup => ({
                id: meetup._id.toString(),
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                description: meetup.description
            }))
        },
        revalidate: 1
    }
}

// export async function getServerSideProps(context) {
//     const req = context.req
//     const res = context.res

//     // fetch data from an API
//     return {
//         props: { meetups: DUMMY_MEETUPS }
//     }
// }

export default HomePage