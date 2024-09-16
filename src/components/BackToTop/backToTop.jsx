'use client';
import { useEffect, useState } from 'react';
import { FloatButton } from 'antd';
import { isMobile as detectMobile } from 'react-device-detect';

function BackToTop() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(detectMobile); // Detect mobile on the client side
    }, []);

    return (
        <>
            <FloatButton.BackTop
                type='primary'
                style={isMobile ? {
                    width: '45px',
                    height: '45px',
                    right: '10px',
                    bottom: '100px',
                } : {
                    width: '45px',
                    height: '45px',
                    right: '50px',
                    bottom: '100px',
                }}
            />
        </>
    );
}

export default BackToTop;