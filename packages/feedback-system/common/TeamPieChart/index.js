import { ResponsivePie } from '@cogoport/charts/pie';

function TeamPieChart({ data }) {
	return (
		<div style={{ height: '100%' }}>
			<ResponsivePie
				data={data}
				innerRadius={0.5}
				padAngle={0.7}
				cornerRadius={3}
				activeOuterRadiusOffset={8}
				borderWidth={1}
				enableArcLinkLabels={false}
				colors={['#F2E3C3', '#F9AE64', '#828282', '#FDE74D']}
				colorBy="index"
				margin={{ top: 10, right: 20, bottom: 80, left: 20 }}
				theme="background"
				legends={[
					{
						anchor        : 'left',
						direction     : 'column',
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

		</div>

	);
}

export default TeamPieChart;
