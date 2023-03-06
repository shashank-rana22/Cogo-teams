import { ResponsiveBar } from '@cogoport/charts/bar';
import { startCase } from '@cogoport/utils';

import useGetStats from '../hooks/useGetStats';

function MonthyStats() {
	const { data:stats, loading } = useGetStats();
	let data = [];

	if (loading) {
		[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((item) => {
			const obj = {};
			obj.month = item;
			obj.loading = item;
			data.push(obj);
		});
	}

	if (stats) {
		data = [];
		(stats).forEach((statLabel) => {
			const obj = {};
			obj.month = (startCase(Object.keys(statLabel)));
			obj.reverted = (Object.values(statLabel)[0].reverted_rfqs_count);
			obj.total = (Object.values(statLabel)[0].total_rfqs_count);
			obj.booked = (Object.values(statLabel)[0]
				.atleast_one_booking_received_count);
			data.push(obj);
		});
	}

	return (
		<ResponsiveBar
			data={data}
			keys={stats ? ['total', 'reverted', 'booked'] : ['loading']}
			indexBy="month"
			margin={{
				top: 40, right: 30, bottom: 26, left: 0,
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
			borderRadius="1px"
			legendLabel={(e) => {
				if (e.id === 'total') {
					return 'Total RFQs Count';
				}
				if (e.id === 'reverted') {
					return 'Reverted RFQs Count';
				}
				if (e.id === 'booked') {
					return 'Atleast 1 Booking Received Count';
				}
				return 'Loading Data';
			}}
			legends={[
				{
					anchor        : 'top-right',
					direction     : 'row',
					justify       : false,
					translateY    : -30,
					translateX    : -80,
					itemsSpacing  : 60,
					itemWidth     : 100,
					itemHeight    : 20,
					itemDirection : 'left-to-right',
					itemOpacity   : 0.85,
					symbolSize    : 10,
					symbolShape   : 'circle',
				},
			]}
		/>
	);
}
export default MonthyStats;
