import React, { useEffect, useState, useRef } from 'react';
import './Loader.css';

export const Loader = ({ loading }) => {
    const loaderTopRef = useRef(null);
    const loaderBottomRef = useRef(null);
    if (!loading) {
        //faire une transition qui fais baisser la height du loader
        for (let i = 0; i < 51; i++) {
            setTimeout(() => {
                loaderTopRef.current.style.height = `${50 - i}vh`;
            }, i * 6);
        }
        for (let i = 0; i < 60; i++) {
            setTimeout(() => {
                loaderBottomRef.current.style.height = `${50 - i}vh`;
            }, i * 6);
        }
    }

    return (
        <div className="loader">
            <div className="loader__top" ref={loaderTopRef}>
            </div>
            <div className="loader__bottom" ref={loaderBottomRef}>
            </div>
        </div>
    )
}