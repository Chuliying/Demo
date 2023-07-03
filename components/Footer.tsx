import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import LanguageToggle from './LanguageToggle'
import { getCategories } from "../service";
import { useAppSelector } from '../reducer/hooks'


interface Categories {
    name: string,
    slug: string,
    nameTw: string,
    categoryPic: {
        url: string
    }
}

const Footer = () => {
    const [categories, setCategories] = useState<Categories[]>([]);
    const localeKey: number =
        useAppSelector(state => state.viewport.locale) === "en" ? 0 : 1;

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCategories();
            setCategories(data);
        }
        fetchData();
    }, [])

    return (
        <footer>
            <div className='theme_hr' />
            <div className="container">
                <div className='company_box'>
                    <div className="logo">
                        <Link href="/">
                            <Image style={{ width: "100%", height: "auto" }} src={require('../public/logo.svg')} priority alt='logo' />
                        </Link>
                    </div>

                    <LanguageToggle />
                </div>
                <div className='pages_box eng'>
                    <ul>
                        <li>
                            <Link href='/about'>
                                <h3>
                                    About
                                </h3>
                            </Link>
                        </li>
                        <li>
                            <Link href='/works'>
                                <h3>
                                    Works
                                </h3>
                            </Link>
                        </li>
                        <li>
                            <Link href='/news'>
                                <h3>
                                    News
                                </h3>
                            </Link>
                        </li>
                        <li>
                            <Link href='/publication'>
                                <h3>
                                    Publication
                                </h3>
                            </Link>
                        </li>
                        <li>
                            <Link href='/donation'>
                                <h3>
                                    Donation
                                </h3>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='categories_box'>
                    <h3 className='eng'>
                        <Link href={'/works'}>
                            Categories
                        </Link>
                    </h3>
                    <ul>
                        {categories.map(cate => (<li key={cate.name}><Link href={`/category/${cate.slug}`}>{localeKey ? cate.nameTw : cate.name}</Link></li>))}
                    </ul>
                    <hr />
                    <h3 className='eng'>
                        Follow Us:
                    </h3>
                    <ul className='social-media_box'>
                        <li>
                            <Link href="https://www.facebook.com/against.again.troupe" target='_blank'><FontAwesomeIcon icon={faFacebook} /></Link>
                        </li>
                        <li>
                            <Link href="https://www.instagram.com/against.again.troupe/" target='_blank'><FontAwesomeIcon icon={faInstagram} /></Link>
                        </li>
                        <li>
                            <Link href="https://www.youtube.com/channel/UCkcvDn7cwlNyk7UtrUd6WiA" target='_blank'><FontAwesomeIcon icon={faYoutube} /></Link>
                        </li>
                        <li>
                            <Link href="mailto:against.again@gmail.com"><FontAwesomeIcon icon={faEnvelope} /></Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='copyright eng'>
                <span>
                    © Against Again Troupe.
                </span>
            </div>
        </footer>
    )
}

export default Footer