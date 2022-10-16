import Chart from 'react-apexcharts';
import React from 'react';
import ChartCard from './ChartCard';
import { chartoptions } from '../../utils/chartoptions';
import { lineSeries } from '../../utils/mock_chart_data';

interface LineChartProps {
  title?: string;
  subheader?: string;
  series?: { name: string; data: [] }[];
}

const LineChart: React.FC<LineChartProps> = ({
  title = 'Line Chart',
  subheader = 'Sample Line Chart',
  series = lineSeries,
}) => {
  const state = {
    series: series,
    options: chartoptions,
  };
  return (
    <ChartCard title={title}>
      <Chart
        options={state.options}
        series={state.series}
        type='line'
        height={350}
        width='100%'
      />
    </ChartCard>
  );
};

export default LineChart;
