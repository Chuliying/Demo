import React from 'react'
import { useAppSelector } from '../reducer/hooks'
import Image from 'next/image'
import Link from 'next/link'
import LanguageToggle from './LanguageToggle'
import Hamburger from './Hamburger'

const Header = () => {
    const localeKey: number =
        useAppSelector(state => state.viewport.locale) === "en" ? 0 : 1;
    return (
        <header>
            <div className="logo">
                <Link href="/">
                    <Image alt="logo" style={{ height: "45px", width: "auto" }} priority src={require('../public/logo-w.svg')} />
                </Link>
            </div>
            <ul className={localeKey ? '' : 'eng'}>
                <li>
                    <Link href="/about">
                        {localeKey ? '關於我們' : 'About'}
                    </Link>
                </li>
                <li>
                    <Link href="/works">
                        {localeKey ? '作品' : 'Work'}
                    </Link>
                </li>
                <li>
                    <Link href="/news">
                        {localeKey ? '最新消息' : 'News'}
                    </Link>
                </li>
                <li>
                    <Link href="/publication">
                        {localeKey ? '出版物' : 'Publication'}
                    </Link>
                </li>
                <li>
                    <Link href="/donation">
                        {localeKey ? '捐款' : 'Donation'}
                    </Link>
                </li>
                <li>
                    <LanguageToggle />
                </li>
            </ul>
            <Hamburger />
        </header>
    )
}

export default Header