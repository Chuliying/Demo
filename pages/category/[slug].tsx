import React, { useEffect, useState } from "react";
import { GetCategoryPosts, GetCategorySlugs } from "../../service";
import { useRouter } from "next/router";
import Loader from "../../components/Loader";
import Card from "../../components/Card";
import { useAppSelector } from "../../reducer/hooks";
import Filter from "../../components/Filter";
import moment from "moment";
import styles from "./category.module.scss";

interface CategoriesPost {
    nameTw: string;
    name: string;
    localizations: [
        {
            title: string;
            slug: string;
            year: string;
            tags: [
                {
                    name: string;
                }
            ];
            cover: {
                url: string;
            };
        }
    ];
}
type CategoriesPosts = [CategoriesPost];
type filteredPost = {
    key: string;
    value: CategoriesPosts;
};

type filteredPosts = filteredPost[];

const Category = (props: {
    CategoryPosts: CategoriesPosts;
    CategoryTitle: { name: string; nameTw: string };
}) => {
    const { CategoryPosts, CategoryTitle } = props;
    const [filteredPosts, setFilteredPosts] = useState<filteredPosts>([]);
    const router = useRouter();
    const [filterType, setFilterType] = useState<string>("default");
    const localeKey: number =
        useAppSelector((state) => state.viewport.locale) === "en" ? 0 : 1;
    const filterSelect = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFilterType(event.target.value);
    };

    // filter //
    useEffect(() => {
        // 當filter有選取時取得新posts data
        let newFilteredPosts = new Map<string, CategoriesPosts>();
        if (filterType === "tag") {
            for (let post of CategoryPosts) {
                for (let tag of post.localizations[localeKey].tags) {
                    newFilteredPosts.has(tag.name)
                        ? newFilteredPosts.get(tag.name)!.push(post)
                        : newFilteredPosts.set(tag.name, [post]);
                }
            }
        }
        if (filterType === "year") {
            for (let post of CategoryPosts) {
                const year = moment(post.localizations[localeKey].year).format("YYYY");
                newFilteredPosts.has(year)
                    ? newFilteredPosts.get(year)!.push(post)
                    : newFilteredPosts.set(year, [post]);
            }
            // arrange asc
            newFilteredPosts = new Map(Array.from(newFilteredPosts).sort());
        }
        setFilteredPosts(
            // to array
            Array.from(newFilteredPosts, ([key, value]) => ({ key, value }))
        );
    }, [CategoryPosts, filterType, localeKey]);

    if (router.isFallback) {
        return <Loader />;
    } else {
        return (
            <div className={`main_container full`}>
                <h1>{CategoryTitle.nameTw}</h1>
                <h2 className="eng">{CategoryTitle.name}</h2>
                <hr />
                <Filter filterSelect={filterSelect} />
                {/* default filter */}
                {filterType === "default" ? (
                    <div className="flex_container">
                        {CategoryPosts.map((work: CategoriesPost, i: number) => (
                            <Card
                                localeKey={localeKey}
                                work={work.localizations[localeKey]}
                                key={i}
                            />
                        ))}
                    </div>
                ) : (
                    <div className={styles.filtedContainer}>
                        {filteredPosts.map((each: filteredPost, i: number) => (
                            <div key={i}>
                                <h3
                                    className={`${styles.filterTitle} ${localeKey ? "" : "eng"}`}
                                >
                                    {each.key}
                                </h3>
                                <div className="flex_container">
                                    {each.value.map((work: CategoriesPost, i: number) => (
                                        <Card
                                            localeKey={localeKey}
                                            work={work.localizations[localeKey]}
                                            key={i}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
};

export default Category;
interface Paramas {
    params: {
        slug: string;
        CategoryPosts: CategoriesPosts;
        CategoryTitle: {
            name: string;
            nameTw: string;
        };
    };
}
export async function getStaticProps({ params }: Paramas) {
    const data = await GetCategoryPosts(params.slug);
    return {
        props: {
            CategoryPosts: data.category?.works,
            CategoryTitle: { name: data.category.name, nameTw: data.category.nameTw },
        },
    };
}

export async function getStaticPaths() {
    const slugs = (await GetCategorySlugs()).map((category) => category.slug);
    return {
        paths: slugs.map((slug: string) => ({ params: { slug: slug } })),
        fallback: "blocking",
    };
}
