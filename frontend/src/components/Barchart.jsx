import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';

// Register the necessary components from Chart.js
ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

const Barchart = () => {

    const { barchart } = useSelector(state => state.transactionState);

    let transactionData = barchart?.map((item) => item.count);

    // data
    const data = {
        labels: ['0-100', '101-200', '201-300', '301-400', '401-500', '501-600', '601-700', '701-800', '801-900', '901- Above'],
        datasets: [
            {
                label: 'Total transactions',
                data: transactionData,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Transaction in the specified price range',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="w-full h-64 sm:h-96">
            <Bar data={data} options={options} />
        </div>
    );
};

export default Barchart;
