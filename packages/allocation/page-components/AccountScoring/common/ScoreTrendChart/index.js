import { ResponsiveLine } from '@cogoport/charts/line';

// const TREND_BREAKPOINT = 0;

const COLOUR_MAPPING = {
	up    : '#ED3726',
	down  : '#34C759',
	still : '#13c0d4',
};

// const getColor = ({ current_position, previous_position }) => {
// 	if (!current_position || !previous_position) return '#13c0d4';

// 	const trend = current_position - previous_position;

// 	if (trend === TREND_BREAKPOINT) {
// 		return '#13c0d4';
// 	}

// 	return (trend < TREND_BREAKPOINT ? '#34C759' : '#ED3726');
// };

function ScoreTrendChart(props) {
	const { trend, data } = props;

	console.log('trend :: ', trend);

	const graphData = [{ id: 'trend', color: COLOUR_MAPPING[trend] || '#13c0d4', data }];

	console.log('graphData :: ', graphData);

	return (
		<ResponsiveLine
			data={graphData}
			width={100}
			height={20}
			colors={COLOUR_MAPPING[trend] || '#13c0d4'}
			xScale={{ type: 'point' }}
			yScale={{
				type    : 'linear',
				min     : 'auto',
				max     : 'auto',
				stacked : true,
				reverse : false,
			}}
			axisTop={null}
			axisRight={null}
			axisBottom={null}
			axisLeft={null}
			enableGridX={false}
			enableGridY={false}
			lineWidth={1}
			enablePoints={false}
			pointSize={2}
			pointColor={{ theme: 'background' }}
			pointBorderColor={{ from: 'serieColor' }}
			pointLabelYOffset={-12}
			areaOpacity={0}
			isInteractive={false}
			enableCrosshair={false}
			legends={[]}
			animate={false}
		/>
	);
}

// const graphData = [
// 	{
// 	  id    : 'japan',
// 	  color : 'hsl(160, 70%, 50%)',
// 	  data  : [
// 			{
// 		  x : 'plane',
// 		  y : 12,
// 			},
// 			{
// 		  x : 'helicopter',
// 		  y : 136,
// 			},
// 			{
// 		  x : 'boat',
// 		  y : 148,
// 			},
// 			{
// 		  x : 'train',
// 		  y : 4,
// 			},
// 			{
// 		  x : 'subway',
// 		  y : 111,
// 			},
// 			{
// 		  x : 'bus',
// 		  y : 79,
// 			},
// 			{
// 		  x : 'car',
// 		  y : 87,
// 			},
// 			{
// 		  x : 'moto',
// 		  y : 15,
// 			},
// 			{
// 		  x : 'bicycle',
// 		  y : 38,
// 			},
// 			{
// 		  x : 'horse',
// 		  y : 39,
// 			},
// 			{
// 		  x : 'skateboard',
// 		  y : 195,
// 			},
// 			{
// 		  x : 'others',
// 		  y : 72,
// 			},
// 	  ],
// 	},
// 	{
// 	  id    : 'france',
// 	  color : 'hsl(33, 70%, 50%)',
// 	  data  : [
// 			{
// 		  x : 'plane',
// 		  y : 99,
// 			},
// 			{
// 		  x : 'helicopter',
// 		  y : 78,
// 			},
// 			{
// 		  x : 'boat',
// 		  y : 149,
// 			},
// 			{
// 		  x : 'train',
// 		  y : 4,
// 			},
// 			{
// 		  x : 'subway',
// 		  y : 253,
// 			},
// 			{
// 		  x : 'bus',
// 		  y : 288,
// 			},
// 			{
// 		  x : 'car',
// 		  y : 43,
// 			},
// 			{
// 		  x : 'moto',
// 		  y : 130,
// 			},
// 			{
// 		  x : 'bicycle',
// 		  y : 206,
// 			},
// 			{
// 		  x : 'horse',
// 		  y : 151,
// 			},
// 			{
// 		  x : 'skateboard',
// 		  y : 123,
// 			},
// 			{
// 		  x : 'others',
// 		  y : 134,
// 			},
// 	  ],
// 	},
// 	{
// 	  id    : 'us',
// 	  color : 'hsl(323, 70%, 50%)',
// 	  data  : [
// 			{
// 		  x : 'plane',
// 		  y : 35,
// 			},
// 			{
// 		  x : 'helicopter',
// 		  y : 20,
// 			},
// 			{
// 		  x : 'boat',
// 		  y : 7,
// 			},
// 			{
// 		  x : 'train',
// 		  y : 91,
// 			},
// 			{
// 		  x : 'subway',
// 		  y : 28,
// 			},
// 			{
// 		  x : 'bus',
// 		  y : 39,
// 			},
// 			{
// 		  x : 'car',
// 		  y : 58,
// 			},
// 			{
// 		  x : 'moto',
// 		  y : 62,
// 			},
// 			{
// 		  x : 'bicycle',
// 		  y : 225,
// 			},
// 			{
// 		  x : 'horse',
// 		  y : 105,
// 			},
// 			{
// 		  x : 'skateboard',
// 		  y : 21,
// 			},
// 			{
// 		  x : 'others',
// 		  y : 290,
// 			},
// 	  ],
// 	},
// 	{
// 	  id    : 'germany',
// 	  color : 'hsl(148, 70%, 50%)',
// 	  data  : [
// 			{
// 		  x : 'plane',
// 		  y : 138,
// 			},
// 			{
// 		  x : 'helicopter',
// 		  y : 148,
// 			},
// 			{
// 		  x : 'boat',
// 		  y : 47,
// 			},
// 			{
// 		  x : 'train',
// 		  y : 130,
// 			},
// 			{
// 		  x : 'subway',
// 		  y : 80,
// 			},
// 			{
// 		  x : 'bus',
// 		  y : 168,
// 			},
// 			{
// 		  x : 'car',
// 		  y : 113,
// 			},
// 			{
// 		  x : 'moto',
// 		  y : 108,
// 			},
// 			{
// 		  x : 'bicycle',
// 		  y : 116,
// 			},
// 			{
// 		  x : 'horse',
// 		  y : 82,
// 			},
// 			{
// 		  x : 'skateboard',
// 		  y : 202,
// 			},
// 			{
// 		  x : 'others',
// 		  y : 71,
// 			},
// 	  ],
// 	},
// 	{
// 	  id    : 'norway',
// 	  color : 'hsl(280, 70%, 50%)',
// 	  data  : [
// 			{
// 		  x : 'plane',
// 		  y : 113,
// 			},
// 			{
// 		  x : 'helicopter',
// 		  y : 82,
// 			},
// 			{
// 		  x : 'boat',
// 		  y : 211,
// 			},
// 			{
// 		  x : 'train',
// 		  y : 269,
// 			},
// 			{
// 		  x : 'subway',
// 		  y : 198,
// 			},
// 			{
// 		  x : 'bus',
// 		  y : 261,
// 			},
// 			{
// 		  x : 'car',
// 		  y : 147,
// 			},
// 			{
// 		  x : 'moto',
// 		  y : 214,
// 			},
// 			{
// 		  x : 'bicycle',
// 		  y : 237,
// 			},
// 			{
// 		  x : 'horse',
// 		  y : 234,
// 			},
// 			{
// 		  x : 'skateboard',
// 		  y : 244,
// 			},
// 			{
// 		  x : 'others',
// 		  y : 280,
// 			},
// 	  ],
// 	},
// ];

// function MyResponsiveLine() {
// 	return (
// 		<ResponsiveLine
// 			data={graphData}
// 			margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
// 			xScale={{ type: 'point' }}
// 			yScale={{
//         	type    : 'linear',
//         	min     : 'auto',
//         	max     : 'auto',
//         	stacked : true,
//         	reverse : false,
// 			}}
// 			yFormat=" >-.2f"
// 			axisTop={null}
// 			axisRight={null}
// 			axisBottom={{
//         	tickSize       : 5,
//         	tickPadding    : 5,
//         	tickRotation   : 0,
//         	legend         : 'transportation',
//         	legendOffset   : 36,
//         	legendPosition : 'middle',
// 			}}
// 			axisLeft={{
//         	tickSize       : 5,
//         	tickPadding    : 5,
//         	tickRotation   : 0,
//         	legend         : 'count',
//         	legendOffset   : -40,
//         	legendPosition : 'middle',
// 			}}
// 			pointSize={10}
// 			pointColor={{ theme: 'background' }}
// 			pointBorderWidth={2}
// 			pointBorderColor={{ from: 'serieColor' }}
// 			pointLabelYOffset={-12}
// 			useMesh
// 			legends={[
//         	{
//         		anchor            : 'bottom-right',
//         		direction         : 'column',
//         		justify           : false,
//         		translateX        : 100,
//         		translateY        : 0,
//         		itemsSpacing      : 0,
//         		itemDirection     : 'left-to-right',
//         		itemWidth         : 80,
//         		itemHeight        : 20,
//         		itemOpacity       : 0.75,
//         		symbolSize        : 12,
//         		symbolShape       : 'circle',
//         		symbolBorderColor : 'rgba(0, 0, 0, .5)',
//         		effects           : [
//         			{
//         				on    : 'hover',
//         				style : {
//         					itemBackground : 'rgba(0, 0, 0, .03)',
//         					itemOpacity    : 1,
// 							},
//         			},
//         		],
//         	},
// 			]}
// 		/>
// 	);
// }

export default ScoreTrendChart;
