'use client';
import { FloatButton } from 'antd';
import isMobile from 'react-device-detect';

function BackToTop() {
    return (
        <>
            <FloatButton.BackTop
                type='primary'
                style={ isMobile ? {
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
    )
}

export default BackToTop;