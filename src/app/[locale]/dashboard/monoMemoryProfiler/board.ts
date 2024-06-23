import monoDataList from "./monoDataList";

const boardList = [
    {
        id: '1',
        w: 'calc(30% - 16px)',
        h: 320,
        type: 'bar',
        data: {
            type: 'inline',
            value: monoDataList,
        },
    },
    {
        id: '2',
        w: 'calc(58% - 16px)',
        h: 320,
        type: 'barline',
        data: {
            type: 'fetch',
            value: 'https://render.alipay.com/p/yuyan/180020010001215413/antd-charts/line-slider.json',
          }
    },
    {
        id: '3',
        w: 'calc(34% - 16px)',
        h: 320,
        type: 'pie',
    },
]

export default boardList;