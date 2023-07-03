import React, { useRef } from 'react'
import { useIntersection } from './userIntersection'
import { useAppSelector } from '../reducer/hooks';

const Line = (props: { dir: string, pos: string }) => {
    const windowHeight = useAppSelector(state => state.viewport.height)
    const { dir, pos } = props;
    const thisDomRef = useRef<HTMLDivElement>(null);
    const isVisible = useIntersection(thisDomRef, `0px 0px ${-windowHeight / 8}px 0px`);

    return (
        <div className={`${isVisible && 'active'} ${dir} ${pos} line`} ref={thisDomRef}></div>
    )
}

export default Line