import { ResponsivePie } from '@cogoport/charts/pie';

function PieChart({ data = [], count = 300, type = 'Predicted' }) {
	const colors = data.map((item) => item.color);
	const BORDER_COLOR_MODIFIERS = 0.2;
	const ARC_LABELS_TEXT_COLOR_MODIFIERS = 2;

	return (
		<div style={{ display: 'flex', flexBasis: '33%', height: '350px', background: '#fff', padding: '0' }}>

			<ResponsivePie
				colors={colors}
				data={data}
				margin={{
					top    : 40,
					right  : 80,
					bottom : 40,
					// left   : 80,
				}}
				innerRadius={0.6}
				padAngle={0.7}
				cornerRadius={3}
				activeOuterRadiusOffset={8}
				borderWidth={1}
				borderColor={{
					from      : 'color',
					modifiers : [['darker', BORDER_COLOR_MODIFIERS]],
				}}
				enableArcLinkLabels={false}
				arcLinkLabelsSkipAngle={10}
				arcLinkLabelsTextColor="#333333"
				arcLinkLabelsThickness={2}
				arcLinkLabelsColor={{ from: 'color' }}
				arcLabelsSkipAngle={10}
				arcLabelsTextColor={{
					from      : 'color',
					modifiers : [['darker', ARC_LABELS_TEXT_COLOR_MODIFIERS]],
				}}
				// defs={[
				// 	{
				// 		id         : 'dots',
				// 		type       : 'patternDots',
				// 		background : 'inherit',
				// 		color      : 'rgba(255, 255, 255, 0.3)',
				// 		size       : 4,
				// 		padding    : 1,
				// 		stagger    : true,
				// 	},
				// 	{
				// 		id         : 'lines',
				// 		type       : 'patternLines',
				// 		background : 'inherit',
				// 		color      : 'rgba(255, 255, 255, 0.3)',
				// 		rotation   : -45,
				// 		lineWidth  : 6,
				// 		spacing    : 10,
				// 	},
				// ]}
				// fill={[
				// 	{
				// 		match: {
				// 			id: 'ruby',
				// 		},
				// 		id: 'dots',
				// 	},
				// 	{
				// 		match: {
				// 			id: 'c',
				// 		},
				// 		id: 'dots',
				// 	},
				// 	{
				// 		match: {
				// 			id: 'go',
				// 		},
				// 		id: 'dots',
				// 	},
				// 	{
				// 		match: {
				// 			id: 'python',
				// 		},
				// 		id: 'dots',
				// 	},
				// 	{
				// 		match: {
				// 			id: 'scala',
				// 		},
				// 		id: 'lines',
				// 	},
				// 	{
				// 		match: {
				// 			id: 'lisp',
				// 		},
				// 		id: 'lines',
				// 	},
				// 	{
				// 		match: {
				// 			id: 'elixir',
				// 		},
				// 		id: 'lines',
				// 	},
				// 	{
				// 		match: {
				// 			id: 'javascript',
				// 		},
				// 		id: 'lines',
				// 	},
				// ]}
				legends={[
					{
						anchor        : 'right',
						direction     : 'column',
						justify       : false,
						translateX    : 50,
						translateY    : 17,
						itemsSpacing  : 0,
						itemWidth     : 69,
						itemHeight    : 33,
						itemTextColor : '#999',
						itemDirection : 'left-to-right',
						itemOpacity   : 1,
						symbolSize    : 9,
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

			{count
				? (
					<div style={{
						marginLeft    : '-290px',
						display       : 'flex',
						flexDirection : 'column',
						alignItems    : 'center',
						marginTop     : '160px',
					}}
					>
						<div style={{ fontSize: '10px' }}>{type}</div>
						<div style={{ fontSize: '16px' }}>
							{count}
							{' '}
							TEU
						</div>

					</div>
				) : null}
		</div>
	);
}

export default PieChart;
