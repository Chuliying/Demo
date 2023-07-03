import React from "react";
import Image from "next/image";
import styles from "./component.module.scss";
import Link from "next/link";

interface Publications {
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

const PublicaionCard = (props: { publicationData: Publications; localeKey: number }) => {
    const { publicationData, localeKey } = props;
    return (
        <div className={styles.publicationCard}>
            <hr />
            <div className={styles.imgBox}>
                <Image
                    src={publicationData.cover.url}
                    width={300}
                    height={300}
                    alt={publicationData.localizations[0].name}
                />
            </div>
            <h4>{publicationData.localizations[localeKey].name}</h4>

            <h5 className={localeKey ? '' : 'eng'}>{localeKey ? '價格：' : 'Price:'} {publicationData.price} {localeKey ? '元' : 'NTD'} </h5>
            <p>{publicationData.localizations[localeKey].description}</p>
            <Link target="_blank" href={'https://docs.google.com/forms/d/e/1FAIpQLSegujVLfc-lJjHEa6yWZnLHrJP728ldrvyvuzunhx_-7ce72A/viewform'}>
                <button className={localeKey ? '' : 'eng'}>
                    {localeKey ? '馬上購買' : 'Shop Now'}
                </button>
            </Link>
        </div>
    );
};

export default PublicaionCard;
