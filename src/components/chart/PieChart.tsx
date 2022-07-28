import React from 'react';
import Chart from 'react-apexcharts';

const PieChart = () => {
  const state = {
    options: {
      plotOptions: {
        pie: {
          donut: {
            size: '45%',
          },
        },
      },
    },
    data: [44, 55, 41, 17, 15],
    labels: ['A', 'B', 'C', 'D', 'E'],
  };
  return (
    <div>
      <Chart
        options={state.options}
        series={state.data}
        type='donut'
        width='380'
      />
    </div>
  );
};

export default PieChart;
