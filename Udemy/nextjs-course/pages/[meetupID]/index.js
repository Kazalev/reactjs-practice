import Head from 'next/head'
import { MongoClient, ObjectId } from "mongodb"
import MeetupDetail from "../../components/meetups/MeetupDetail"

const MeetupDetails = ({ meetupData }) => {
    return (
        <>
            <Head>
                <title>{meetupData.title}</title>
                <meta name="description" content={meetupData.description} />
            </Head>
            <MeetupDetail
                title={meetupData.title}
                image={meetupData.image}
                address={meetupData.address}
                description={meetupData.description}
            />
        </>
    )
}

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://Kazalev:oS7dXb8yqVORYrDu@softuni.jyv2w.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db()
    const meetupsCollection = db.collection('meetups')
    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray()
    client.close()

    return {
        fallback: 'blocking',
        paths: meetups.map(meetup => ({ params: { meetupID: meetup._id.toString() } }))
    }
}

export async function getStaticProps(context) {
    const meetupID = context.params.meetupID

    const client = await MongoClient.connect('mongodb+srv://Kazalev:oS7dXb8yqVORYrDu@softuni.jyv2w.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db()
    const meetupsCollection = db.collection('meetups')
    const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupID) })
    client.close()

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                image: selectedMeetup.image,
                address: selectedMeetup.address,
                description: selectedMeetup.description
            }
        }
    }
}

export default MeetupDetails