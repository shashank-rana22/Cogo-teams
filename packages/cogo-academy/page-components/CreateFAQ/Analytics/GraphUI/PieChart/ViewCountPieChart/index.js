import { ResponsivePie } from '@cogoport/charts/pie';

import styles from './styles.module.css';

function ViewCountPieChart({ view_count_data }) {
	return (
		<div className={styles.inner_pie}>
			<ResponsivePie
				data={view_count_data}
				margin={{
					top    : 50,
					right  : 10,
					bottom : 80,
					left   : 40,
				}}
				innerRadius={0}
				padAngle={0}
				cornerRadius={0}
				activeOuterRadiusOffset={8}
				borderWidth={1}
				colors={{ datum: 'data.color' }}
				borderColor={{
					from      : 'color',
					modifiers : [['darker', 0.2]],
				}}
				enableArcLabels
				enableArcLinkLabels={false}
				isInteractive
				defs={[
					{
						id         : 'dots',
						type       : 'patternDots',
						background : 'inherit',
						color      : 'rgba(255, 255, 255, )',
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
				legends={[
					{
						anchor        : 'bottom',
						direction     : 'column',
						justify       : false,
						translateX    : -150,
						translateY    : 56,
						itemsSpacing  : 10,
						itemWidth     : 80,
						itemHeight    : 18,
						itemTextColor : '#999',
						itemDirection : 'left-to-right',
						itemOpacity   : 1,
						symbolSize    : 20,
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

export default ViewCountPieChart;
