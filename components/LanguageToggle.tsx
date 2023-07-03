import React from 'react'
import { useAppDispatch, useAppSelector } from '../reducer/hooks'
import { toggleLocale } from '../reducer/viewport'
const LanguageToggle = () => {
    const Dispatch = useAppDispatch();
    const locale = useAppSelector(state => state.viewport.locale);

    const toggleLanguage = (): void => {
        Dispatch(toggleLocale());
        localStorage.setItem('locale', locale !== 'en' ? 'en' : 'zh_TW');
    }

    return (
        <div style={{ cursor: 'pointer' }} onClick={() => toggleLanguage()}>
            <p className={locale === 'en' ? '' : 'eng'}>{locale === 'en' ? '語言切換' : 'Language'}</p>
        </div>
    )
}

export default LanguageToggle