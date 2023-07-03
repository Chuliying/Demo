import React from 'react'
import { getPage } from '../../service'
import Content from '../../components/Content'
import { useAppSelector } from '../../reducer/hooks'

interface Page {
    cover: {
        url: string;
    };

    localizations: [
        {
            name: string;
            description: {
                raw: any;
            };
        }
    ];
}

const Donation = (props: { page: Page }) => {
    const { page } = props;
    const localeKey: number = useAppSelector(state => state.viewport.locale) === 'en' ? 0 : 1;

    return (
        <div className={`main_container  page_container`}>
            <h1>贊助</h1>
            <h2 className="eng">Donation</h2>
            <div className="theme_hr"></div>
            <Content contentData={page.localizations[localeKey].description.raw} />
        </div>
    )
}

export default Donation

export async function getStaticProps() {
    const PageData = await getPage('donation');
    return {
        props: { page: PageData }
    }
}