import React, { useState, useEffect } from "react";
import { getCategories } from "../../service";
import Link from "next/link";
import Image from "next/image";
import Lines from "../../components/Lines";
import { useAppSelector } from "../../reducer/hooks";
import styles from "./works.module.scss";

interface Categories {
    name: string;
    slug: string;
    nameTw: string;
    categoryPic: {
        url: string;
    };
}
const Works = () => {
    const [categories, setCategories] = useState<Categories[]>([]);
    const locale: string = useAppSelector(state => state.viewport.locale);
    useEffect(() => {
        if (locale) {
            const fetchData = async () => {
                const data: Categories[] = await getCategories();
                setCategories(data);
            };
            fetchData();
        }
    }, [locale]);
    return (
        <div className={`main_container ${styles.worksContainer}`}>
            <h1>作品分類</h1>
            <h2 className={`eng`}>Categories</h2>
            <div className="theme_hr"></div>
            <div className={`flex_container ${styles.worksMain}`}>
                {categories.map((category: Categories, index) => (
                    <div key={index} className={`relative`}>
                        <Lines />
                        <div>
                            <Link href={`category/${category.slug}`}>
                                <Image
                                    style={{
                                        objectFit: "cover",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    priority
                                    src={category.categoryPic.url}
                                    alt={category.name}
                                    width={384}
                                    height={206}
                                />
                            </Link>
                            <div className={styles.textBox}>
                                <h3>
                                    <Link href={`category/${category.slug}`}> {category.nameTw} </Link>
                                </h3>
                                <p className="eng">{category.name}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Works;
