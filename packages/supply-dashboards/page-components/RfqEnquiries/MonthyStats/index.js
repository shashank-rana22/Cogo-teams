import { ResponsiveBar } from '@cogoport/charts/bar';
import { startCase } from '@cogoport/utils';

import useGetStats from '../hooks/useGetStats';

function MonthyStats() {
	const { data:stats,loading } = useGetStats();
	let data = [];

	if(loading){
		[1,2,3,4,5,6,7,8,9,10,11,12].forEach((item)=>{
			const obj = {};
			obj.month = item;
			obj.loading = item;
			data.push(obj);
		})
	}

	if (stats) {
		data=[];
		(stats).forEach((statLabel) => {
			const obj = {};
			obj.month = (startCase(Object.keys(statLabel)));
			obj.Reverted = (Object.values(statLabel)[0].reverted_rfqs_count);
			obj.Totat = (Object.values(statLabel)[0].total_rfqs_count );
			// obj.Booked = (Object.values(statLabel)[0]
			// 	.atleast_one_booking_received_count_direct );
			data.push(obj);
		});
	}

	return (
		<ResponsiveBar
			data={data}
			keys={stats ?['Totat', 'Reverted', 'Booked']: ['loading']}
			indexBy="month"
			margin={{
				top: 10, right: 30, bottom: 26, left: 0,
			}}
			padding={0.5}
			valueScale={{ type: 'linear' }}
			indexScale={{ type: 'band', round: true }}
			colors={['#88CAD1', '#CFEAED', '#EDF7F8']}
			layout="vertical"
			enableGridY={false}
			axisBottom={{
				tickSize       : 0,
				tickPadding    : 5,
				tickRotation   : 0,
				legend         : 'month',
				legendPosition : 'middle',
				legendOffset   : 32,
			}}
			axisRight={false}
			tickSize={0}
			tickPadding={20}
			isInteractive
			innerPadding={0}
			label
			legends={[
				{
					dataFrom      : 'keys',
					anchor        : 'top-right',
					direction     : 'row',
					justify       : false,
					translateY    : -10,
					translateX    : -80,
					itemsSpacing  : 60,
					itemWidth     : 100,
					itemHeight    : 20,
					itemDirection : 'left-to-right',
					itemOpacity   : 0.85,
					symbolSize    : 10,
				},
			]}
		/>
	);
}
export default MonthyStats;
