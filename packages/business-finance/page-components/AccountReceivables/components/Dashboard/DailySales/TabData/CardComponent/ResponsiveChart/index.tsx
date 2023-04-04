import { ResponsiveLine } from '@cogoport/charts/line';
import { StreamDatum } from '@cogoport/charts/stream/index';
import { Loader } from '@cogoport/components';

import getAmountInLakhCrK from '../../../../../../../commons/getAmountInLakhCrK';
import EmptyState from '../../../../../../commons/EmptyStateDocs';

import styles from './styles.module.css';

interface ResponsiveChartProps {
	data?: StreamDatum[],
	loadingData?: boolean
}

function ResponsiveChart({ data, loadingData }: ResponsiveChartProps) {
	const AmountData = [];
	const CountData = [];

	(data || []).forEach((item) => {
		AmountData.push({
			x : item.date,
			y : item.Amount,
		});
		CountData.push({
			x : item.date,
			y : item.Count,
		});
	});

	const finalData = [
		{
			id   : 'Amount',
			data : AmountData,
		},
		{
			id   : 'Count',
			data : CountData,
		},
	];

	if (data === undefined) {
		return <EmptyState />;
	}
	return (
		loadingData ? <div className={styles.loader}><Loader style={{ height: '100px', width: '50px' }} /></div>
			: (
				<ResponsiveLine
					data={finalData}
					margin={{ top: 10, right: 120, bottom: 100, left: 90 }}
					xScale={{ type: 'point' }}
					enableGridX={false}
					colors={['#88CAD1', '#F68B21']}
					enableSlices="x"
					yScale={{ type: 'linear', min: 0, max: 'auto' }}
					axisTop={null}
					axisRight={null}
					axisBottom={{
						tickSize       : 5,
						tickPadding    : 10,
						tickRotation   : 36,
						legend         : 'Date',
						legendOffset   : 46,
						legendPosition : 'middle',
					}}
					axisLeft={{
						tickSize       : 5,
						tickPadding    : 5,
						tickRotation   : 0,
						legend         : 'Amount',
						legendOffset   : -84,
						legendPosition : 'middle',
						format         : (value) => getAmountInLakhCrK(value),
					}}
					pointSize={5}
					pointBorderWidth={2}
					pointBorderColor={{ from: 'serieColor' }}
					pointLabelYOffset={-12}
					useMesh
					legends={[{
						anchor            : 'bottom-right',
						direction         : 'column',
						justify           : false,
						translateX        : 100,
						translateY        : 0,
						itemsSpacing      : 0,
						itemDirection     : 'left-to-right',
						itemWidth         : 80,
						itemHeight        : 20,
						itemOpacity       : 0.75,
						symbolSize        : 12,
						symbolShape       : 'circle',
						symbolBorderColor : 'rgba(0, 0, 0, .5)',
						effects           : [{
							on    : 'hover',
							style : { itemBackground: 'rgba(0, 0, 0, .03)', itemOpacity: 1 },
						}],
					}]}
				/>
			)
	);
}

export default ResponsiveChart;
