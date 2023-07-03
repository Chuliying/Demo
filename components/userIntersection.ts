import { useEffect, useState } from "react";

export const useIntersection = (element: React.RefObject<HTMLElement>, rootMargin: string): boolean => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect((): void => {
        const current = element?.current;
        const observer: IntersectionObserver = new IntersectionObserver(
            ([observeObject]) => {
                setIsVisible(observeObject.isIntersecting);
            },
            { rootMargin },
        );
        current && observer?.observe(current);

    }, [element, rootMargin]);

    return isVisible;
};