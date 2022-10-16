import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { circleSeries } from '../../utils/mock_chart_data';
import ChartCard from './ChartCard';

interface CircleChartProps {
  title?: string;
  series?: any[];
}

const CircleChart: React.FC<CircleChartProps> = ({
  title,
  series = circleSeries,
}) => {
  const state = {
    series: series,
    options: {
      chart: {
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      grid: { show: false },
    },
  };
  return (
    <ChartCard title={title}>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type='donut'
        height={350}
        width={350}
      />
    </ChartCard>
  );
};

export default CircleChart;
