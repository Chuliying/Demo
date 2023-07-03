import React from 'react'
import styles from './news.module.scss'
import NewsList from '../../components/NewsList'
import { getNewsPosts } from '../../service'
import { useAppSelector } from '../../reducer/hooks'

interface News {
    localizations: [
        {
            name: string;
            slug: string;
            publishedAt: string;
        }
    ];
}

const NewsListIndex = (props: { newsPost: News[] }) => {
    const { newsPost } = props;
    const locale: string = useAppSelector(state => state.viewport.locale);
    const localeKey: number | undefined = locale === 'en' ? 0 : 1;
    const newsPosts = newsPost.map(news => news.localizations[localeKey])

    return (
        <div className={`${styles.newsContainer} main_container`}>
            <h1>
                最新消息
            </h1>
            <h2 className='eng'>
                NEWS
            </h2>
            <div className={`theme_hr ${styles.theme_hr}`} />
            <NewsList newsPosts={newsPosts} />
        </div>
    )
}

export default NewsListIndex

export async function getStaticProps() {
    const data = await getNewsPosts();
    return {
        props: { newsPost: data }
    }
}