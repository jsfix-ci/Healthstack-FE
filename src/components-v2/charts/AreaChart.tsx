import React from 'react';
import ChartCard from './ChartCard';
import { chartoptions } from '../../utils/chartoptions';
import { areaSeries } from '../../utils/mock_chart_data';
import ReactApexChart from 'react-apexcharts';
import { Typography } from '@mui/material';

interface AreaChartProps {
  title?: string;
  subheader?: string;
  series?: { name: string; data: [] }[];
  height?: any;
}

const AreaChart: React.FC<AreaChartProps> = ({
  title = 'Area Chart',
  subheader = 'Sample Area Chart',
  series = areaSeries,
  height = 200,
}) => {
  const state = {
    series: series,
    options: chartoptions,
  };
  return (
    <ChartCard title={title}>
      <Typography variant='h4' sx={{ p: 1 }}>
        {title}
      </Typography>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type='area'
        height={height}
        width='100%'
      />
    </ChartCard>
  );
};

export default AreaChart;
