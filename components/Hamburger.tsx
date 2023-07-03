import React from 'react'
import { useAppDispatch, useAppSelector } from '../reducer/hooks';
import { toggleMenu } from '../reducer/viewport';

const Hamburger = () => {
    const menuToggled: boolean = useAppSelector(state => state.viewport.menu);
    const dispatch = useAppDispatch();

    const toggleEvent = (): void => {
        dispatch(toggleMenu());
    }
    return (
        <div className='hamburger_container'>
            <div onClick={() => toggleEvent()} className={`hamburger ${menuToggled ? 'active' : ''}`}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Hamburger