'use client'
import Layout from '@/components/Layout';
import React from 'react';
import dynamic from "next/dynamic";
import styles from './index.module.less';

const Heatmap = dynamic(
    ()=>import('@ant-design/charts').then((mod)=>mod.Heatmap),
    {
        ssr:false
    }
)

import boardList from './board';

export default function Dashboard(){

    const config = {
        height: 300,
        autoFit: false,
        boardList,
        xField: (d: { date: string | number | Date; }) => new Date(d.date).getUTCDate(),
        yField: (d: { date: string | number | Date; }) => new Date(d.date).getUTCMonth(),
        colorField: 'temp_max',
        legend: {},
        mark: 'cell',
        style: { inset: 0.5 },
        tooltip: {
            title: 'date',
            field: 'temp_max',
            valueFormatter: '~s',
            pointerEvents: 'none'
        },
    };

    return (
        <Layout curActive='/dashboard/monoMemoryProfiler'>
            <main className={styles.monitorWrap}>
                <Heatmap {...config} />
            </main>
        </Layout>
    );

}