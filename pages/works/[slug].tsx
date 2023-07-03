import React from "react";
import Image from "next/image";
import styles from "./works.module.scss";
import { getWorkDetails, getWorksSlug } from "../../service";
import { useRouter } from "next/router";
import Carousel from "nuka-carousel";
import { useAppSelector } from "../../reducer/hooks";
import Loader from "../../components/Loader";
import moment from "moment";
import Content from "../../components/Content";

interface Work {
    slug: string;
    cover: {
        url: string;
    };
    updatedAt: string;
    category: {
        nameTw: string;
        name: string;
    };
    embededVideo?: string;
    gallery?: [
        {
            url: string;
        }
    ];

    localizations: [
        {
            credit?: string;
            title: string;
            tags?: [{ name: string }];
            info: {
                raw: any;
            };
            content: {
                raw: any;
            };
            related?: {
                raw: any;
            }
        }
    ];
}

const Work = (props: { work: Work }) => {
    const localeKey: number =
        useAppSelector(state => state.viewport.locale) === "en" ? 0 : 1;
    const { work } = props;
    const router = useRouter();

    if (router.isFallback) {
        return <Loader />;
    } else {
        const localizedData = work.localizations[localeKey];
        return (
            <div className={`${styles.workTitlteContainer} content_container`}>
                {work.cover?.url && (
                    <div className="img_box">
                        <Image
                            style={{ objectFit: "contain", width: "100%", height: "auto" }}
                            width={1024}
                            height={776}
                            priority
                            src={work.cover.url}
                            alt={localizedData.title}
                        />
                    </div>
                )}
                <h1 className={localeKey ? "" : "eng"}>{localizedData.title}</h1>
                <h3 className={`category-title ${localeKey ? "" : ""}`}>
                    {localeKey ? work.category.nameTw : work.category.name}
                </h3>
                <p className={`eng time`}>
                    {moment(work.updatedAt).format("MMM DD, YYYY")}
                </p>
                <div className="content">
                    <div className="content-main ">
                        {/* content head */}
                        <div id={styles.workHead} className='content-head'>
                            <div>
                                <h4 className="eng">Info:</h4>
                                <Content contentData={localizedData.info.raw} />
                            </div>
                            <div>
                                <h4 className="eng">Type:</h4>
                                <ul>
                                    {localizedData.tags &&
                                        localizedData.tags.map((tag, i: number) => (
                                            <li key={i}>{tag.name}</li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                        {/* content body */}
                        <div className="content-body">
                            <Content contentData={localizedData.content.raw} />
                            {localizedData.credit && (
                                <div className="credit_box">
                                    <h5 className="eng">Credit:</h5>
                                    <p>{localizedData.credit}</p>
                                </div>
                            )}
                            {localizedData.related && (
                                <div className='relatedBox'>
                                    <hr />
                                    <h5>
                                        Related:
                                    </h5>
                                    <Content contentData={localizedData.related.raw} />
                                </div>
                            )}
                        </div>
                    </div>
                    {(work.gallery?.length || work.embededVideo?.length) && (
                        <div className="content-gallery">
                            <Carousel
                                cellAlign={"center"}
                                autoplay={false}
                                wrapAround={true}
                                defaultControlsConfig={{
                                    nextButtonText: (
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth="0"
                                            viewBox="0 0 16 16"
                                            height="32"
                                            width="32"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"></path>
                                        </svg>
                                    ),
                                    prevButtonText: (
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth="0"
                                            viewBox="0 0 16 16"
                                            height="32"
                                            width="32"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"></path>
                                        </svg>
                                    ),
                                }}
                            >
                                {work.embededVideo && (<div className="iframe_box">
                                    <iframe
                                        width="800"
                                        height="480px"
                                        src={`https://www.youtube.com/embed/${work.embededVideo}`}
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    ></iframe>
                                </div>)}

                                {work.gallery && work.gallery.map((img: { url: string }, index: number) => (
                                    <Image
                                        key={index}
                                        src={img.url}
                                        alt={localizedData.title}
                                        priority
                                        width="0"
                                        height="0"
                                        sizes="100vw"
                                    />
                                ))}
                            </Carousel>
                        </div>
                    )}
                </div>
            </div>
        );
    }
};

export default Work;

interface StaticProps {
    params: {
        slug: string;
    };
}

export async function getStaticProps({ params }: StaticProps) {
    const data = await getWorkDetails(params.slug);
    return {
        props: { work: data },
    };
}

export async function getStaticPaths() {
    const slugs = (await getWorksSlug()).map((work) => work.slug);
    return {
        paths: slugs.map((slug) => ({ params: { slug: slug } })),
        fallback: 'blocking',
    };
}
