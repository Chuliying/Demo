import React, { ReactNode, useEffect, useState, useRef } from 'react'
import { Header, Footer, Menu } from './'
import { useAppDispatch, useAppSelector } from '../reducer/hooks'
import { setWidth, setHeight, setLocale } from '../reducer/viewport'

interface Props {
    children?: ReactNode
}

const Layout = ({ children }: Props) => {
    const locale: string = useAppSelector(state => state.viewport.locale)
    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);
    const dispatch = useAppDispatch();



    // 先抓一次寬度，綁定window resize 重新抓寬高
    useEffect(() => {
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        });
    }, [])

    // 寬度改變就重新 dispatch 
    useEffect(() => {
        dispatch(setWidth(windowWidth));
        dispatch(setHeight(windowHeight));
    }, [dispatch, windowWidth, windowHeight])

    // 設定 locale 
    useEffect(() => {
        const savedLocale: string | null = localStorage.getItem('locale');
        if (savedLocale === ('en' || 'zh_TW')) {
            dispatch(setLocale(savedLocale));
        } else {
            localStorage.setItem('locale', locale)
        }
    }, [dispatch, locale])

    return (
        <>
            <Header />
            <Menu />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout