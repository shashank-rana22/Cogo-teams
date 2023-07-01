import { ResponsiveLine } from '@cogoport/charts/line';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useEffect } from 'react';

function TotalSearchesGraph({ graphData, setShowTotalCost }) {
	useEffect(() => {
		setShowTotalCost(false);
	}, [setShowTotalCost]);

	const theme = {
		legends: {
			text: {
				fontSize: 13,
			},
		},
	};

	const formatDateValue = (value) => {
		const date = formatDate({
			date       : value,
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
			formatType : 'date',
		});

		const time = formatDate({
			date       : value,
			timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
			formatType : 'time',
		});

		return `${date}, ${time}`;
	};

	return (
		<ResponsiveLine
			style={{ height: '50px' }}
			data={graphData}
			theme={theme}
			margin={{
				right  : 10,
				top    : 50,
				bottom : 50,
				left   : 60,
			}}
			xScale={{ type: 'point' }}
			yScale={{
				type    : 'linear',
				min     : 'auto',
				max     : 'auto',
				stacked : false,
				reverse : false,
			}}
			colors={{ datum: 'color' }}
			curve="monotoneX"
			yFormat=" >-.2f"
			axisTop={null}
			axisRight={null}
			axisBottom={{
				orient         : 'bottom',
				tickSize       : 5,
				tickPadding    : 5,
				tickRotation   : 30,
				legendOffset   : 36,
				legendPosition : 'middle',
				format(value) {
					return formatDateValue(value);
				},

			}}
			axisLeft={{
				orient         : 'left',
				tickSize       : 5,
				tickPadding    : 5,
				tickRotation   : 0,
				legend         : 'count',
				legendOffset   : -40,
				legendPosition : 'middle',
			}}
			pointSize={6}
			pointColor="white"
			pointBorderWidth={2}
			pointBorderColor={{ from: 'serieColor' }}
			pointLabelYOffset={-14}
			useMesh
			legends={[
				{
					anchor            : 'upper-left',
					direction         : 'row',
					justify           : false,
					translateX        : -6,
					translateY        : 0,
					itemsSpacing      : 40,
					itemDirection     : 'left-to-right',
					itemWidth         : 120,
					itemHeight        : -40,
					itemOpacity       : 0.75,
					symbolSize        : 12,
					symbolShape       : 'circle',
					symbolBorderColor : 'rgba(0, 0, 0, .5)',

					effects: [
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
	);
}

export default TotalSearchesGraph;
