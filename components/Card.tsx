import React from 'react'
import Image from 'next/image';
import moment from 'moment';
import styles from './component.module.scss'
import Link from 'next/link';
import Lines from './Lines';
interface Work {
    cover: {
        url: string
    }
    slug: string;
    title: string;
    year: string;
    tags: [{
        name: string
    }]
}
const Card = (props: { work: Work, localeKey: number }) => {
    const { work, localeKey } = props;
    return (
        <div className={styles.card}>
            <Lines />
            <div className={styles.imgBox}>
                <Link href={`/works/${work.slug}`}>
                    <Image
                        src={work.cover.url}
                        alt={work.title}
                        width={0}
                        height={0}
                        priority
                        sizes="100vh"
                    />
                </Link>
                <Lines />
            </div>
            <Link href={`/works/${work.slug}`}>
                <div className={styles.textBox}>
                    <h3>{work.title}</h3>
                    <p>{moment(work.year).format("YYYY")}</p>
                    <ul>
                        {work.tags.map((tag: { name: string }, i: number) => (
                            <li key={i} className={localeKey ? '' : 'eng'}>{tag.name}</li>
                        ))}
                    </ul>
                </div>
            </Link>
        </div>
    )
}

export default Card