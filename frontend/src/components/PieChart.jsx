import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {

    const { piechart } = useSelector(state => state.transactionState);

    // S
    let categoryObj = {
        "Men's clothing": 0, 'Jewelery': 0, 'Electronics': 0, "Women's clothing": 0, 'Beauty': 0
    };

    // Set category count
    piechart?.forEach(pie => {
        let category = `${pie.category.charAt(0).toUpperCase()}${pie.category.slice(1)}`;

        if (!(category in categoryObj)) {
            categoryObj[category] = 0;
        }

        categoryObj[category] += pie.noOfItems; // summing the count property
    });

    const data = {
        labels: ["Men's clothing", 'Jewelery', 'Electronics', "Women's clothing", 'Beauty'],
        datasets: [
            {
                label: 'Category Count',
                data: Object.values(categoryObj),
                backgroundColor: [
                    '#4ade80', // Green
                    '#60a5fa', // Blue
                    '#f87171', // Red
                    '#facc15', // Yellow
                    '#a78bfa', // Purple
                ],
                hoverBackgroundColor: [
                    '#34d399', // Lighter Green
                    '#3b82f6', // Lighter Blue
                    '#fca5a5', // Lighter Red
                    '#fde047', // Lighter Yellow
                    '#c4b5fd', // Lighter Purple
                ],
                borderColor: '#ffffff', // White border for each slice
                borderWidth: 2,
                fill: false,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top', // Positions the legend at the top
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
                },
            },
        },
    };

    return (
        <div className="flex flex-col items-center my-8 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Category Distribution</h2>
            <div className="relative h-80 w-full sm:w-1/2 md:w-3/4 lg:w-1/2">
                <Pie data={data} options={options} />
            </div>
            <div className="mt-4 flex flex-wrap justify-center">
                {data.labels.map((label, index) => (
                    <div key={index} className="flex items-center mx-2 mb-2">
                        <span
                            className="block w-4 h-4 rounded-full"
                            style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
                        ></span>
                        <span className="ml-2 text-gray-600">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PieChart;
