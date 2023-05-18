import { ResponsiveLine } from '@cogoport/charts/line';

import { LEVEL_DATA } from '../constants';

function NetworkLineChart({ networkData = {} }) {
	const mapdata = (data) => {
		const keys = Object.keys(data || {});
		let details = [];
		keys.forEach((key, index) => {
			details = [
				...details,
				{
					x : `L${index + 1}`,
					y : data?.[key],
				},
			];
		});
		return details;
	};

	const network = mapdata(networkData);

	const filteredNetwork = network.filter((item) => LEVEL_DATA.includes(item?.x));

	const newData = [
		{
			id   : 'network',
			data : filteredNetwork,
		},
	];

	return (
		<ResponsiveLine
			data={newData}
			width={320}
			height={170}
			colors={['#F9AE64']}
			margin={{ top: 5, right: 10, bottom: 50, left: 50 }}
			xScale={{ type: 'point' }}
			yScale={{
				type    : 'linear',
				min     : 'auto',
				max     : 'auto',
				stacked : false,
				reverse : false,
			}}
			curve="natural"
			axisTop={null}
			axisRight={null}
			axisBottom={{
				tickSize       : 0,
				tickPadding    : 10,
				tickRotation   : 0,
				legendOffset   : 36,
				legendPosition : 'middle',
			}}
			axisLeft={{
				tickSize       : 0,
				tickPadding    : 10,
				tickValues     : 5,
				tickRotation   : 0,
				legend         : 'cogopoints',
				legendOffset   : -45,
				legendPosition : 'middle',
			}}
			enableGridX={false}
			enablePoints={false}
			pointSize={10}
			pointColor={{ theme: 'background' }}
			pointBorderWidth={2}
			pointBorderColor={{ from: 'serieColor' }}
			pointLabelYOffset={-12}
			useMesh

		/>
	);
}
export default NetworkLineChart;
