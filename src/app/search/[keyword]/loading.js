'use client';
import TopHeader from "@/components/Header/header";
import { Spin } from "antd";

export default function Loading() {
    return (
        <>
            <TopHeader />
            <div style={{
                width: '100%',
                height: '90vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Spin size="large"/>
            </div>
        </>
    );
};