'use client'
import Layout from '@/components/Layout';
import React from 'react';
import dynamic from "next/dynamic";
import styles from './index.module.less';
import { format } from 'fecha';
import { HolderOutlined } from '@ant-design/icons';

const Heatmap = dynamic(
    () => import('@ant-design/charts').then((mod) => mod.Heatmap),
    {
        ssr: false
    }
)

const Line = dynamic(
    () => import('@ant-design/plots').then((mod) => mod.Line),
    {
        ssr: false
    }
)

import monoDataList from './monoDataList';
import { HeatmapConfig } from "@ant-design/plots/es/components/heatmap";
import boardList from './board';
import { SearchTree } from './SearchTree';

export default function Dashboard() {
    const config: HeatmapConfig = {
        height: 300,
        autoFit: false,
        data: {
            type: 'inline',
            value: monoDataList,
        },
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
        onEvent: (chart, event) => {
            if (event.type === 'pointerup') {
                console.log(event.type);
            }


        }

    };
    const lineConfig = {
        data: {
            type: 'fetch',
            value: 'https://render.alipay.com/p/yuyan/180020010001215413/antd-charts/line-slider.json',
        },
        xField: (d: { date: string | number | Date; }) => new Date(d.date),
        yField: 'close',
        axis: { x: { title: false, size: 40 }, y: { title: false, size: 36 } },
        slider: {
            x: { labelFormatter: (d: any) => format(d, 'YYYY/M/D') },
            y: { labelFormatter: '~s' },
        },
    };
    return (
        <Layout curActive='/dashboard'>
            <main className={styles.dashboardWrap}>
                <div className={styles.content} id='dashboard'>
                    <div key={0} style={{ width: boardList[0].w, height: boardList[0].h }} className={styles.card}>
                        <span className='moveBtn'><HolderOutlined /></span>
                        <Heatmap {...config} />
                    </div>
                    <div key={1} style={{ width: boardList[1].w, height: boardList[1].h }} className={styles.card}>
                        <span className='moveBtn'><HolderOutlined /></span>
                        <Line {...lineConfig} />
                    </div>
                    <div key={2} style={{ width: boardList[2].w, height: boardList[2].h }} className={styles.card}>
                        <span className='moveBtn'><HolderOutlined /></span>
                        <SearchTree />
                    </div>
                </div>
            </main>
        </Layout>
    );

}