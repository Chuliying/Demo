import React from "react";
import { getPage, getMembers, getCoArtists } from "../../service";
import Content from "../../components/Content";
import { useAppSelector } from "../../reducer/hooks";
import PersonCard from "../../components/PersonCard";
import styles from "./about.module.scss";
import Label from "../../components/Label";

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

interface Members {
    photo: {
        url: string;
    };
    localizations: [
        {
            name: string;
            title: string;
            description: string;
        }
    ];
}

// co artist
interface CoArtists {
    photo: {
        url: string;
    };
    localizations: [
        {
            name: string;
            description: string;
        }
    ];
}

const About = (props: {
    page: Page;
    members: Members[];
    coArtists: CoArtists[];
}) => {
    const { page, members, coArtists } = props;

    const localeKey: number =
        useAppSelector(state => state.viewport.locale) === "en" ? 0 : 1;
    return (
        <div className={`main_container  page_container full`}>
            <Label />
            <h1>關於我們</h1>
            <h2 className="eng">About</h2>
            <div className="theme_hr"></div>
            <Content contentData={page.localizations[localeKey].description.raw} />
            <hr />
            <div className={styles.peopoleBox}>
                <h3 className="eng">Members</h3>
                <div className="flex_container">
                    {members.map((member, i) => (
                        <PersonCard key={i} localeKey={localeKey} personData={member} />
                    ))}
                </div>
                <hr />
                <h3 className="eng">Co-Artists</h3>
                {coArtists.map((artist, i) => (
                    <PersonCard key={i} localeKey={localeKey} personData={artist} />
                ))}
            </div>
        </div>
    );
};

export default About;

export async function getStaticProps() {
    const PageData = await getPage("about");
    const MembersData = await getMembers();
    const coArtistsData = await getCoArtists();

    return {
        props: { page: PageData, members: MembersData, coArtists: coArtistsData },
    };
}
