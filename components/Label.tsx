import React from "react";
import styles from "./component.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshake } from "@fortawesome/free-solid-svg-icons";

const Label = () => {
    return (
        <Link target="_blank" href={"https://docs.google.com/forms/d/e/1FAIpQLSd5Q7uSzQPRKjYIxU95hCmq5KLdzXK0IumlrsNh2JjhW9zmCw/viewform"}>
            <div className={styles.label}>
                <p> <FontAwesomeIcon icon={faHandshake} /> 成為再拒之友</p>
            </div>
        </Link>
    );
};

export default Label;
