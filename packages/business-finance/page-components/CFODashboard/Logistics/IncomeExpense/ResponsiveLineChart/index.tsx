import { ResponsiveLine } from '@cogoport/charts/line/index';

function ResponsiveLineChart({ lineData }) {
	return (
		<ResponsiveLine
			data={lineData}
			margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
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
			enableGridX={false}
			colors="#ACDADF"
			axisBottom={{
            	tickSize       : 0,
            	tickPadding    : 10,
            	legendOffset   : 36,
            	legendPosition : 'middle',
			}}
			axisLeft={{
				orient         : 'left',
				tickSize       : 0,
				tickPadding    : 10,
				tickRotation   : 0,
				legendOffset   : 40,
				legendPosition : 'middle',
			}}
			pointSize={6}
			pointColor={{ theme: 'background' }}
			pointBorderWidth={2}
			pointBorderColor="#6FA5AB"
			useMesh

		/>
	);
}
export default ResponsiveLineChart;
