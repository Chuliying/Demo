import React from 'react'
import Link from 'next/link';
import moment from 'moment';
import Line from './Line';
import styles from './component.module.scss'
interface News {
    name: string
    slug: string
    publishedAt: string
}

const NewsList = (props: { newsPosts: News[] }) => {
    const { newsPosts } = props;
    return (
        <ul className={styles.newsList}>
            {newsPosts.map(news => (
                <li key={news.name} className='relative'>
                    <Link href={`news/${news.slug}`}>
                        <h5>{news.name}</h5>
                    </Link>
                    <span className='eng'>
                        {moment(news.publishedAt).format('MMM DD, YYYY')}
                    </span>
                    <Line dir='h' pos='lb' />
                </li>
            ))}
        </ul>
    )
}

export default NewsList