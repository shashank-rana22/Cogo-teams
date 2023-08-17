import { ResponsivePie } from '@cogoport/charts/pie';

const BORDER_COLOR_MODIFIERS = 0.2;
const ARC_LABELS_TEXT_COLOR_MODIFIERS = 2;

function PieChart({ data = [], count = 0, heading = '' }) {
	const colors = data.map((item) => item.color);
	console.log('data', data);
	return (
		<div style={{
			display       : 'flex',
			flexDirection : 'column',
			flexBasis     : '33%',
			height        : '350px',
			background    : '#fff',
			padding       : '0',
			overflow      : 'scroll',
		}}
		>
			<div style={{ fontWeight: 600, paddingLeft: '20px' }}>{heading}</div>

			<ResponsivePie
				colors={colors}
				data={data}
				margin={{
					top    : 40,
					right  : 90,
					bottom : 40,
					// left   : 80,
				}}
				innerRadius={0.8}
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
						marginLeft    : '-83px',
						display       : 'flex',
						flexDirection : 'column',
						alignItems    : 'center',
						marginTop     : '-183px',
					}}
					>
						<div style={{ fontSize: '10px' }}>Predicted</div>
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
