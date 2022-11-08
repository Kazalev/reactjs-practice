// our-domain.com/news/something
import { useRouter } from "next/router"

const DetailPage = () => {
    const router = useRouter()
    const newsID = router.query.newsID

    // send request to backend API 
    // to fetch news with the newsID

    return (
        <h1>The Details Page</h1>
    )
}

export default DetailPage