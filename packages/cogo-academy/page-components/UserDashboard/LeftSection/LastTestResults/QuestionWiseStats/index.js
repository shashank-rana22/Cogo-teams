import { ResponsiveRadialBar } from '@cogoport/charts/bar';

function QuestionWiseStats() {
	const data = [
		{
			id   : 'outer_circle',
			data : [
				{
					x : 'Attempted',
					y : 25,
				},
				{
					x : 'Correct',
					y : 0,
				},
				{
					x : 'Incorrect',
					y : 0,
				},
			],
		},
		{
			id   : 'inner_circle',
			data : [
				{
					x : 'Attempted',
					y : 0,
				},
				{
					x : 'Correct',
					y : 20,
				},
				{
					x : 'Incorrect',
					y : 46,
				},
			],
		},
	];

	return (
		// <ResponsiveRadialBar
		// 	data={data}
		// 	valueFormat=">-.2f"
		// 	endAngle={360}
		// 	innerRadius={0.75}
		// 	padding={0.05}
		// 	cornerRadius={24}
		// 	margin={{ top: 40, right: 120, bottom: 40, left: 40 }}
		// 	borderColor={{
		// 		from      : 'color',
		// 		modifiers : [
		// 			[
		// 				'darker',
		// 				'1',
		// 			],
		// 		],
		// 	}}
		// 	radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
		// 	circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
		// 	labelsSkipAngle={9}
		// 	legends={[
		// 		{
		// 			anchor        : 'right',
		// 			direction     : 'column',
		// 			justify       : false,
		// 			translateX    : 50,
		// 			translateY    : 0,
		// 			itemsSpacing  : 6,
		// 			itemDirection : 'left-to-right',
		// 			itemWidth     : 109,
		// 			itemHeight    : 18,
		// 			itemTextColor : '#999',
		// 			symbolSize    : 18,
		// 			symbolShape   : 'square',
		// 			effects       : [
		// 				{
		// 					on    : 'hover',
		// 					style : {
		// 						itemTextColor: '#000',
		// 					},
		// 				},
		// 			],
		// 		},
		// 	]}
		// />
		null
	);
}

export default QuestionWiseStats;
