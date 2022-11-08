import { MongoClient } from "mongodb"

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const data = req.body

        const url = 'mongodb+srv://Kazalev:oS7dXb8yqVORYrDu@softuni.jyv2w.mongodb.net/meetups?retryWrites=true&w=majority'
        const client = await MongoClient.connect(url)
        const db = client.db()
        const meetupsCollection = db.collection('meetups')

        const result = await meetupsCollection.insertOne(data)
        console.log(result)

        client.close()

        res.status(201).json({ message: 'Meetup inserted!' })
    }
}

export default handler