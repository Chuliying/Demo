import React from 'react'
import Footer from './Footer'
import { useAppSelector, useAppDispatch } from '../reducer/hooks'
import { Dispatch } from '@reduxjs/toolkit'
import { toggleMenu } from '../reducer/viewport'

const Menu = () => {
    const menuToggled: boolean = useAppSelector(state => state.viewport.menu);
    const dispatch: Dispatch = useAppDispatch();
    const menuToggle = () => {
        dispatch(toggleMenu());
    }

    return (
        <div onClick={menuToggle} className={`menu_container ${menuToggled ? 'active' : ''}`}>
            <Footer />
        </div>
    )
}

export default Menu