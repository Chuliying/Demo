import React from 'react'
import Image from 'next/image'
import styles from './component.module.scss'

interface Person {
    photo: {
        url: string
    }
    localizations: [{
        name: string,
        title?: string,
        description: string
    }]
}

const PersonCard = (props: { personData: Person, localeKey: number }) => {
    const { personData, localeKey } = props;
    return (
        <div className={styles.personCard}>
            <div className={styles.imgBox}>
                <Image src={personData.photo.url} width={300} height={300} alt={personData.localizations[0].name} />
            </div>
            <h4>
                {personData.localizations[localeKey].name}
            </h4>
            <h5>
                {personData.localizations[localeKey].title}
            </h5>
            <p>
                {personData.localizations[localeKey].description}
            </p>
        </div>
    )
}

export default PersonCard