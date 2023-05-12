import { ResponsivePie } from '@cogoport/charts/pie';

function SemiPieChart() {
	const data = [
		{
			id    : 'java',
			label : 'java',
			value : 500,
			color : 'hsl(234, 70%, 50%)',
		},
		{
			id    : 'erlang',
			label : 'erlang',
			value : 99,
			color : 'hsl(186, 70%, 50%)',
		},
		{
			id    : 'lisp',
			label : 'lisp',
			value : 405,
			color : 'hsl(88, 70%, 50%)',
		},
		{
			id    : 'sass',
			label : 'sass',
			value : 61,
			color : 'hsl(44, 70%, 50%)',
		},
		{
			id    : 'ruby',
			label : 'ruby',
			value : 229,
			color : 'hsl(162, 70%, 50%)',
		},
	];
	return (
		<ResponsivePie
			data={data}
			margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
			startAngle={-100}
			endAngle={104}
			innerRadius={0.85}
			padAngle={2}
			cornerRadius={36}
			activeInnerRadiusOffset={13}
			activeOuterRadiusOffset={28}
			borderColor={{
        	from      : 'color',
        	modifiers : [
        		[
        			'darker',
        			'1.2',
        		],
        	],
			}}
			enableArcLinkLabels={false}
			arcLinkLabelsTextOffset={9}
			arcLinkLabelsTextColor="#333333"
			arcLinkLabelsOffset={-2}
			arcLinkLabelsDiagonalLength={18}
			arcLinkLabelsStraightLength={16}
			arcLinkLabelsThickness={3}
			arcLinkLabelsColor={{ from: 'color' }}
			enableArcLabels={false}
			arcLabelsRadiusOffset={0.35}
			arcLabelsSkipAngle={15}
			arcLabelsTextColor={{
        	from      : 'color',
        	modifiers : [
        		[
        			'darker',
        			'0.8',
        		],
        	],
			}}
			isInteractive={false}
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
			legends={[]}
		/>
	);
}

export default SemiPieChart;
