import { ResponsivePie } from '@cogoport/charts/pie/index';

function ResponsivePieChart({ pieData }) {
	console.log(pieData, 'datadata');

	return (
		<ResponsivePie
			data={pieData}
			margin={{ top: 40, right: 100, bottom: 80, left: 80 }}
			startAngle={-180}
			endAngle={336}
			sortByValue
			activeInnerRadiusOffset={13}
			activeOuterRadiusOffset={19}
			colors={{ scheme: 'nivo' }}
			borderColor={{
        	from      : 'color',
        	modifiers : [
        		[
        			'darker',
        			'0.1',
        		],
        	],
			}}
			arcLinkLabelsSkipAngle={11}
			arcLinkLabelsTextOffset={16}
			arcLinkLabelsTextColor={{ from: 'color', modifiers: [] }}
			arcLinkLabelsOffset={-14}
			arcLinkLabelsDiagonalLength={17}
			arcLinkLabelsStraightLength={27}
			arcLinkLabelsThickness={2}
			arcLinkLabelsColor={{ from: 'color', modifiers: [] }}
			arcLabel="value"
			arcLabelsRadiusOffset={0.55}
			arcLabelsSkipAngle={7}
			arcLabelsTextColor={{
        	from      : 'color',
        	modifiers : [
        		[
        			'darker',
        			2,
        		],
        	],
			}}
			defs={[
				{
					id         : 'dots',
					type       : 'patternDots',
					background : 'inherit',
					color      : 'rgba(255, 255, 255, 0.3)',
					size       : 4,
					padding    : 1,
					stagger    : true,
				},
				{
					id         : 'lines',
					type       : 'patternLines',
					background : 'inherit',
					color      : 'rgba(255, 255, 255, 0.3)',
					rotation   : -45,
					lineWidth  : 6,
					spacing    : 10,
				},
			]}
			fill={[
				{
					match: {
						id: 'ruby',
					},
					id: 'dots',
				},
				{
					match: {
						id: 'c',
					},
					id: 'dots',
				},
				{
        		match: {
        			id: 'go',
					},
        		id: 'dots',
				},
        	{
        		match: {
        			id: 'python',
					},
        		id: 'dots',
				},
        	{
        		match: {
        			id: 'scala',
					},
        		id: 'lines',
				},
        	{
        		match: {
        			id: 'lisp',
					},
        		id: 'lines',
				},
        	{
        		match: {
        			id: 'elixir',
					},
        		id: 'lines',
				},
        	{
        		match: {
        			id: 'javascript',
					},
        		id: 'lines',
				},
			]}
			motionConfig={{
        	mass      : 1,
        	tension   : 500,
        	friction  : 500,
        	clamp     : true,
        	precision : 0.01,
        	velocity  : 0,
			}}
			transitionMode="middleAngle"
			legends={[
        	{
        		anchor        : 'bottom',
        		direction     : 'row',
        		justify       : false,
        		translateX    : 0,
        		translateY    : 56,
        		itemsSpacing  : 0,
        		itemWidth     : 100,
        		itemHeight    : 18,
        		itemTextColor : '#999',
        		itemDirection : 'left-to-right',
        		itemOpacity   : 1,
        		symbolSize    : 18,
        		symbolShape   : 'circle',
        		effects       : [
        			{
        				on    : 'hover',
        				style : {
        					itemTextColor: '#000',
							},
        			},
        		],
        	},
			]}
		/>
	);
}
export default ResponsivePieChart;
