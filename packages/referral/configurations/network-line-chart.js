import { ResponsiveLine } from '@cogoport/charts/line';

import { FIRST_LEVEL_DATA, SECOUND_LEVEL_DATA, THIRD_LEVEL_DATA } from '../constants';
import { handleValues } from '../utils/handleValue';

function NetworkLineChart({ networkData = {} }) {
	const networkLength = Object.keys(networkData).length;

	const getUserLevel = () => {
		let userLevel = [];
		if (networkLength <= 10) {
			userLevel = FIRST_LEVEL_DATA;
		} else if (networkLength <= 20) {
			userLevel = SECOUND_LEVEL_DATA;
		} else {
			userLevel = THIRD_LEVEL_DATA;
		}
		return userLevel;
	};

	const mapdata = (data) => {
		const keys = Object.keys(data || {});
		let details = [];
		keys.forEach((key, index) => {
			details = [
				...details,
				{
					x : `L${index + 1}`,
					y : handleValues(data?.[key]),
				},
			];
		});
		return details;
	};

	const network = mapdata(networkData);

	const filteredNetwork = network.filter((item) => getUserLevel().includes(item?.x));
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
