'use client';
import { FloatButton } from 'antd';

function BackToTop() {
    return (
        <>
            <FloatButton.BackTop
                type='primary'
                style={{
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