import React from 'react'
import { useAppSelector } from '../../reducer/hooks'
import Image from 'next/image'
import styles from './news.module.scss'
import { getNewsPostDetails, getNewsPostSlug } from '../../service'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Loader from '../../components/Loader'
import moment from 'moment'
import Content from '../../components/Content'
interface NewsPost {
    slug: string;
    cover?: {
        url?: string
    }
    updatedAt: string
    localizations: [
        {
            name: string;
            work?: {
                slug: string;
                title: string;
            };
            content: {
                raw: any;
            };
        }
    ];
}
const NewsPost = (props: { newsPost: NewsPost }) => {
    const localeKey: number = useAppSelector(state => state.viewport.locale) === 'en' ? 0 : 1;
    const { newsPost } = props;
    const router = useRouter();

    if (router.isFallback) {
        return <Loader />
    } else {
        return (
            <div className={` content_container`}>
                <div className={styles.newsTitleContainer}>
                    {newsPost.cover?.url &&
                        <div className={'img_box'}>
                            <Image style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
                                width={1024}
                                height={776}
                                priority
                                src={newsPost.cover.url} alt={newsPost.localizations[localeKey].name} />
                        </div>
                    }
                    <h1>
                        {newsPost.localizations[localeKey].name}
                    </h1>
                    <p className={`eng time`} >
                        {moment(newsPost.updatedAt).format('MMM DD, YYYY')}
                    </p>
                </div>

                <div className={'content'}>
                    <div className={'content-main'}>
                        {newsPost.localizations[localeKey].work ? (
                            <div className={'content-head'}>
                                <div>
                                    <h4>
                                        <span className="eng">Related Work：</span>
                                        <Link href={`/works/${newsPost.localizations[localeKey].work?.slug}`}>
                                            {newsPost.localizations[localeKey].work?.title}
                                        </Link>
                                    </h4>
                                </div>
                            </div>
                        ) : (<hr />)}
                        <div className='content-body'>
                            <Content contentData={newsPost.localizations[localeKey].content.raw} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsPost

interface StaticProps {
    params: {
        slug: string
    }
}

export async function getStaticProps({ params }: StaticProps) {
    const data = await getNewsPostDetails(params.slug);
    return {
        props: { newsPost: data }
    }
}

export async function getStaticPaths() {
    const slugs = (await getNewsPostSlug()).map(post => post.slug);
    return {
        paths: slugs.map((slug) => ({ params: { slug: slug } })),
        fallback: 'blocking',
    }
}