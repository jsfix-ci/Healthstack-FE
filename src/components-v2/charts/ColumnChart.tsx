import ReactApexChart from 'react-apexcharts';
import { chartoptions } from '../../utils/chartoptions';
import { columnSeries } from '../../utils/mock_chart_data';
import ChartCard from './ChartCard';

interface ColumnChartProps {
  title?: string;
  series?: { name: string; data: [] }[];
}

const ColumnChart: React.FC<ColumnChartProps> = ({
  title,
  series = columnSeries,
}) => {
  const state = {
    options: chartoptions,
    series: series,
  };
  return (
    <ChartCard>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type='bar'
        height={340}
        width='100%'
      />
    </ChartCard>
  );
};

export default ColumnChart;
