import { ResponsiveLine } from '@cogoport/charts/line';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

const monthsKey = {
	'01' : 'Jan',
	'02' : 'Feb',
	'03' : 'Mar',
	'04' : 'Apr',
	'05' : 'May',
	'06' : 'Jun',
	'07' : 'Jul',
	'08' : 'Aug',
	'09' : 'Sep',
	10   : 'Oct',
	11   : 'Nov',
	12   : 'Dec',
};
function Frequency({
	avgPriceData,
}) {
	const sellData = [];
	const buyData = [];
	const startMonth = avgPriceData?.last_30_days_avg_price[0]?.day.split('-')?.[1];
	const endMonth = avgPriceData?.last_30_days_avg_price[29]?.day.split('-')?.[1];
	(avgPriceData?.last_30_days_avg_price || []).forEach((item) => {
		sellData.push({
			x : format(item?.day, 'dd'),
			y : item?.day_usd_avg_sell_price,
		});
		buyData.push({
			x : format(item?.day, 'dd'),
			y : item?.day_usd_avg_buy_price,
		});
	});

	const finalData = [
		{
			id   : 'Sell Price',
			data : sellData,
		},
		{
			id   : 'Buy Price',
			data : buyData,
		},
	];

	return (
		<div className={styles.container}>
			<ResponsiveLine
				data={finalData}
				colors={['#88CAD1', '#F8AD68']}
				lineWidth={1}
				enablePoints={false}
				enableGridX={false}
				enableGridY={false}
				margin={{
					top    : 50,
					right  : 110,
					bottom : 50,
					left   : 60,
				}}
				enableArea
				xScale={{ type: 'point' }}
				yScale={{
					type    : 'linear',
					min     : 'auto',
					max     : 'auto',
					stacked : true,
					reverse : false,
				}}
				yFormat=" >-.2f"
				axisTop={null}
				axisRight={null}
				axisBottom={{
					orient         : 'bottom',
					tickSize       : 0,
					tickPadding    : 5,
					tickRotation   : 0,
					legend         : `${monthsKey[startMonth]}-${monthsKey[endMonth]}`,
					legendOffset   : 36,
					legendPosition : 'middle',
				}}
				axisLeft={{
					orient         : 'left',
					tickSize       : 0,
					tickPadding    : 5,
					tickRotation   : 0,
					legend         : 'Price (In USD)',
					legendOffset   : -50,
					legendPosition : 'middle',
				}}
				pointSize={10}
				pointColor={{ theme: 'background' }}
				pointBorderWidth={2}
				pointBorderColor={{ from: 'serieColor' }}
				pointLabelYOffset={-12}
				useMesh
				legends={[
					{
						anchor            : 'bottom-right',
						direction         : 'row',
						justify           : false,
						translateX        : -7,
						translateY        : -300,
						itemsSpacing      : 0,
						itemDirection     : 'left-to-right',
						itemWidth         : 80,
						itemHeight        : 20,
						itemOpacity       : 0.75,
						symbolSize        : 12,
						symbolShape       : 'square',
						symbolBorderColor : 'rgba(0, 0, 0, .5)',
						effects           : [
							{
								on    : 'hover',
								style : {
									itemBackground : 'rgba(0, 0, 0, .03)',
									itemOpacity    : 1,
								},
							},
						],
					},
				]}
			/>
		</div>
	);
}

export default Frequency;
