import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

type Content = {
    text: string;
    type: string;
    children: Children;
    [propName: string]: any;
};
interface Children {
    text: string;
    type: string;
    href?: string;
    openInNewTab?: string;
    [propName: string]: any;
}
const Content = (props: { contentData: any }) => {
    const { contentData } = props;
    const getContentFragment = (
        index: number,
        text: any,
        obj: Children,
        type?: string
    ) => {
        let modifiedText = text;
        // 檢查行內種類
        if (obj) {
            if (obj.bold) {
                modifiedText = <b key={index}>{text}</b>;
            }

            if (obj.italic) {
                modifiedText = <em key={index}>{text}</em>;
            }

            if (obj.underline) {
                modifiedText = <u key={index}>{text}</u>;
            }
            if (obj.href) {
                modifiedText = (
                    <Link
                        href={obj.href}
                        target={obj.openInNewTab ? "_blank" : ""}
                        rel={obj.openInNewTab ? "noreferrer" : "noopener"}
                        key={index}
                    >
                        {obj.children[0].text}
                    </Link>
                );
            }
            if (obj.type === "list-item") {
                modifiedText = obj.children[0].children.map(
                    (li: Content, index: number) => <li key={index}>{li.text}</li>
                );
            }
            if (obj.code) {
                obj.type = "code";
            }
        }

        // 檢查 tag
        switch (type) {
            case "block-quote":
                return (
                    <blockquote key={index}>
                        <p>
                            {modifiedText.map((item: ReactNode, i: number) => (
                                <React.Fragment key={i}>{item}</React.Fragment>
                            ))}
                        </p>
                    </blockquote>
                );
            case "bulleted-list":
                return (
                    <ul key={index}>
                        {modifiedText.map((item: ReactNode, i: number) => (
                            <React.Fragment key={i}>{item}</React.Fragment>
                        ))}
                    </ul>
                );
            case "numbered-list":
                return (
                    <ol key={index}>
                        {modifiedText.map((item: ReactNode, i: number) => (
                            <React.Fragment key={i}>{item}</React.Fragment>
                        ))}
                    </ol>
                );
            case "heading-three":
                return (
                    <h3 key={index}>
                        {modifiedText.map((item: ReactNode, i: number) => (
                            <React.Fragment key={i}>{item}</React.Fragment>
                        ))}
                    </h3>
                );
            case "code-block":
                return (
                    <div key={index}
                        className="iframe_container"
                        dangerouslySetInnerHTML={{ __html: modifiedText }}
                    />
                );
            case "paragraph":
                return (
                    <p key={index}>
                        {modifiedText.map((item: ReactNode, i: number) => (
                            <React.Fragment key={i}>{item}</React.Fragment>
                        ))}
                    </p>
                );
            case "heading-four":
                return (
                    <h4 key={index}>
                        {modifiedText.map((item: ReactNode, i: number) => (
                            <React.Fragment key={i}>{item}</React.Fragment>
                        ))}
                    </h4>
                );
            case "image":
                return (
                    <figure key={index}>
                        <Image
                            alt={obj.title}
                            height={obj.height}
                            width={obj.width}
                            src={obj.src}
                        />
                    </figure>
                );
            case "link":
                return (
                    <Link
                        key={index}
                        rel="noreferrer"
                        href={obj.href || ""}
                        target="_blank"
                    >
                        {modifiedText.map((item: ReactNode, i: number) => (
                            <React.Fragment key={i}>{item}</React.Fragment>
                        ))}
                    </Link>
                );
            default:
                return modifiedText;
        }
    };
    return (
        <div className="content_block">
            {contentData.children.map((typeObj: Content, index: number) => {
                const children = typeObj.children.map(
                    (item: Children, itemIndex: number) =>
                        getContentFragment(itemIndex, item.text, item)
                );

                return getContentFragment(index, children, typeObj, typeObj.type);
            })}
        </div>
    );
};

export default Content;
