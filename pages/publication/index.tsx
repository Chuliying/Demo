import React from "react";
import { getPage, getPublications } from "../../service";
import Content from "../../components/Content";
import { useAppSelector } from "../../reducer/hooks";
import PublicaionCard from "../../components/PublicaionCard";

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

interface Publicaions {
    cover: {
        url: string;
    };
    price: number;
    localizations: [
        {
            name: string;
            description: string;
        }
    ];
}

const Publication = (props: { page: Page; publicaions: Publicaions[] }) => {
    const { page, publicaions } = props;
    const localeKey: number =
        useAppSelector(state => state.viewport.locale) === "en" ? 0 : 1;
    return (
        <div className={`main_container page_container`}>
            <h1>購買出版物</h1>
            <h2 className="eng">Publication</h2>
            <div className="theme_hr"></div>
            <Content contentData={page.localizations[localeKey].description.raw} />
            {publicaions.map((pubData, i) => (<div key={i}>
                <PublicaionCard publicationData={pubData} localeKey={localeKey} />
            </div>))}


        </div>
    );
};

export default Publication;

export async function getStaticProps() {
    const PageData = await getPage("publication");
    const PublicationData = await getPublications();
    return {
        props: { page: PageData, publicaions: PublicationData },
    };
}
