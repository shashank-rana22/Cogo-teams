import { ResponsiveLine } from '@cogoport/charts/line';
import { ResponsiveStream, StreamDatum } from '@cogoport/charts/stream/index';
import { Loader } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { addDays, format, getMonth } from '@cogoport/utils';

import { getformatPrice } from '../../../../../../commons/getFormatPrice';

import styles from './styles.module.css';

interface ResponsiveChartProps {
	data?: StreamDatum[],
	loadingData?: boolean
}

const getAmountInLakhCrK = (value:number) => {
	const val = Math.abs(value);

	let formatedAmount = '';

	if (val >= 10000000) {
		formatedAmount = `${(val / 10000000).toFixed(2)} Cr`;
	} else if (val >= 100000) {
		formatedAmount = `${(val / 100000).toFixed(2)} Lac`;
	} else if (val >= 1000) {
		formatedAmount = `${(val / 1000).toFixed(2)} K`;
	}

	return formatedAmount;
};

export { getAmountInLakhCrK };

function ResponsiveChart({ data, loadingData }: ResponsiveChartProps) {
	console.log('data', data);

	const AmountData = [];
	const CountData = [];

	// const monthstart = getMonth(date);

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
	// const monthend = getMonth(date);

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

	return (
		loadingData ? <div className={styles.loader}><Loader style={{ height: '100px', width: '50px' }} /></div>
			: (
				// <ResponsiveLine
				// 	data={finalData}
				// 	margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
				// 	axisTop={null}
				// 	axisRight={null}
				// 	axisBottom={{
				// 		tickSize     : 5,
				// 		tickPadding  : 5,
				// 		tickRotation : 0,
				// 		legend       : '',
				// 		legendOffset : 36,
				// 	}}
				// 	axisLeft={{
				// 		tickSize     : 5,
				// 		tickPadding  : 5,
				// 		tickRotation : 0,
				// 		legend       : '',
				// 		legendOffset : -40,
				// 		format       : (value) => getformatPrice(value),
				// 	}}
				// 	enableGridX={false}
				// 	enableGridY
				// 	curve="linear"
				// 	colors={['#FFE8A4']}
				// 	legends={[
				// 		{
				// 			anchor        : 'bottom-right',
				// 			direction     : 'column',
				// 			translateX    : 100,
				// 			itemWidth     : 80,
				// 			itemHeight    : 20,
				// 			itemTextColor : '#999999',
				// 			symbolSize    : 12,
				// 			symbolShape   : 'circle',
				// 			effects       : [
				// 				{
				// 					on    : 'hover',
				// 					style : {
				// 						itemTextColor: '#000000',
				// 					},
				// 				},
				// 			],
				// 		},
				// 	]}
				// />
				<ResponsiveLine
					data={finalData}
					margin={{ top: 50, right: 120, bottom: 50, left: 90 }}
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
						legendOffset   : 36,
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
