import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getFeaturedPosts } from '../service'
import { useAppSelector } from '../reducer/hooks'
import Lines from './Lines'

const KV = () => {
    const [featuredPost, setFeaturedPost] = useState({ name: '', slug: '' });
    const locale = useAppSelector(state => state.viewport.locale)
    useEffect(() => {
        if (locale) {
            const fetchData = async () => {
                const data = await getFeaturedPosts(locale);
                setFeaturedPost(data[0].localizations[0]);
            }
            fetchData();
        }
    }, [locale])
    return (
        <div className='KV'>
            {/* <h1 className='eng'>Against Again Troupe.</h1>
            <h2>
                再拒劇團
            </h2> */}
            {featuredPost.name && (
                <div className='featured-news_box relative'>
                    <Lines />
                    <p className='eng'>
                        Featured
                    </p>
                    <h5>
                        {featuredPost.name}
                    </h5>
                    <Link href={`news/${featuredPost.slug}`}>
                        <button className='eng'>
                            View more...
                        </button>
                    </Link>
                </div>
            )}
            <div className='img_box'>
                <Image style={{ width: '100%' }} src={require('../public/kv-bg.jpg')} alt="bg" priority />
            </div>
        </div>
    )
}

export default KV