// our-domain.com/news

import Link from "next/link"

const NewsPage = () => {
    return (
        <>
            <h1>The News Page</h1>
            <ul>
                <li>
                    <Link href="/news/nextjs-is-a-great-framework">
                        NextJS is a Great Framework
                    </Link>
                </li>
                <li>Somethinh else</li>
            </ul>
        </>
    )
}

export default NewsPage