import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import KV from '../components/KV'
import styles from './index.module.scss'
import { getCategories, getIndexNewsPosts } from '../service'
import Link from 'next/link'
import Lines from '../components/Lines'
import { useAppSelector } from '../reducer/hooks'
import NewsList from '../components/NewsList'

interface Categories {
    name: string,
    slug: string,
    nameTw: string,
    categoryPic: {
        url: string
    }
}
interface News {
    name: string
    slug: string
    publishedAt: string
}

const Index = () => {
    const [categories, setCategories] = useState<Categories[]>([]);
    const [newsPosts, setNewsPosts] = useState<News[]>([]);
    const locale: string = useAppSelector(state => state.viewport.locale);

    // 取得分類列表資訊
    useEffect(() => {
        const fetchData = async () => {
            const data = await getCategories();
            setCategories(data);
        }
        fetchData();
    }, [])

    useEffect(() => {
        if (locale) {
            const fetchData = async () => {
                const data = await getIndexNewsPosts();
                const localeKey: number | undefined = locale === 'en' ? 0 : 1;
                setNewsPosts(data.map((news) => news.localizations[localeKey]));
            }
            fetchData();
        }
    }, [locale])


    return (
        <div id={styles.index_container}>
            <KV></KV>
            <div className='index-categoreis'>
                <div className={`main_container ${styles.main_container}`}>
                    <div className='flex_container'>
                        <h3 className={`eng ${styles.indexTitle}`}>
                            Categories
                        </h3>
                        <div className={styles.cateContainer}>
                            {categories.map((category: Categories, index) => (
                                <div key={index} className={`${styles.relative} relative`}>
                                    <Lines />
                                    <Link href={`category/${category.slug}`} >
                                        <Image
                                            style={{
                                                objectFit: "cover",
                                                width: "100%",
                                                height: "100%",
                                            }}
                                            priority
                                            src={category.categoryPic.url}
                                            alt={category.name}
                                            width={384}
                                            height={206}
                                        />
                                    </Link>
                                    <div className={styles.floatText}>
                                        <Link href={`category/${category.slug}`} >
                                            <h3>
                                                {category.nameTw}
                                            </h3>
                                        </Link>
                                        <Link href={`category/${category.slug}`} >
                                            <p className='eng'>
                                                {category.name}
                                            </p>
                                        </Link>
                                    </div>
                                </div>

                            ))}
                        </div>

                    </div>
                </div>
            </div>
            <hr />
            <div className='index-news'>
                <div className='main_container'>
                    <div className='flex_container'>
                        <h3 className={`eng ${styles.indexTitle}`}>
                            News
                        </h3>
                        <div className={styles.indexNewsList}>
                            <NewsList newsPosts={newsPosts} />
                            <Link href={'/news'}>
                                <button className='eng'>
                                    View more...
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Index