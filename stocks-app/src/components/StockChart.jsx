import React, {useState} from 'react';
import Chart from 'react-apexcharts';

const StockChart = ({chartData, symbol}) => {
    const [dateFormat, setDateFormat] = useState('24h');
    const {day, week, year} = chartData;

    const determineTimeFormat = () => {
        switch(dateFormat) {
            case '24h':
                return day;
            case '7d':
                return week;
            case '1y':
                return year
            default:
                return day;
        }
    };

    const color = determineTimeFormat()[determineTimeFormat().length -1].y - determineTimeFormat()[0].y
        ? '#26C281'
        : '#ed3419'

    // const changeColorHandler = () => {
    //     if (dateFormat === '24h') {
    //         return ['#2E93fA']
    //     } else if (dateFormat === '7d') {
    //         return ['#66DA26']
    //     } else {
    //         return ['#E91E63']
    //     }
    // }

    const options = {
        title: {
            text: symbol,
            align: 'center',
            style: {
                fontSize: '24px'
            }
        },
        chart: {
            id: 'stock-data',
            animation: {
                speed: 1300
            }
        },
        xaxis: {
            type: 'datetime',
            label: {
                dateTimeUTC: false
            }
        },
        tooltip: {
            x: {
                format: 'MMM dd HH:MM'
            }
        },
        colors: [color]
    }

    const series = [{
        name: symbol,
        data: determineTimeFormat(dateFormat)
    }]

    const renderButtonSelect = (button) => {
        const classes = `btn m-1 `;
        if (button === dateFormat) {
            return classes + 'btn-primary'
        } else {
            return classes + 'btn-outline-primary'
        }
    }

    return (
        <div
            className='mt-5 p-4 shadow-sm bg-white'
        >
            <Chart options={options} series={series} type='area' width='100%'/>
            <div>
                <button
                    className={renderButtonSelect('24h')}
                    onClick={() => setDateFormat('24h')}
                >
                    24h
                </button>
                <button
                    className={renderButtonSelect('7d')}
                    onClick={() => setDateFormat('7d')}
                >
                    7d
                </button>
                <button
                    className={renderButtonSelect('1y')}
                    onClick={() => setDateFormat('1y')}
                >
                    1y
                </button>
            </div>
        </div>
    );
};

export default StockChart;