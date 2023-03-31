import { ResponsivePie } from '@cogoport/charts/pie';

import styles from './styles.module.css';

// function CombinedPieChart({ pie_outer_data, pie_data }) {
function CombinedPieChart({ pie_data }) {
	// const RESPECTED_ANGLE = (pie_data?.[1]?.value || 0) * 3.6 || 0;
	return (
		<div style={{ width: '80%', height: '80%', position: 'relative' }}>
			<div className={styles.inner_pie}>
				<ResponsivePie
					data={pie_data}
					margin={{
						top    : 20,
						right  : -15,
						bottom : 60,
						left   : 70,
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
							translateX    : -170,
							translateY    : 58,
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
										itemTextColor : '#000',
										symbolSize    : 26,
										transition    : 'all 0.3s ease',

									},
								},
							],
						},
					]}
				/>
			</div>

			{/* <div className={styles.outer_pie}>
				<ResponsivePie
					data={pie_outer_data}
					margin={{
						top    : 20,
						right  : 10,
						bottom : 60,
						left   : 70,
					}}
					innerRadius={0.9}
					padAngle={0}
					startAngle={360}
					endAngle={360 - RESPECTED_ANGLE}
					cornerRadius={0}
					activeOuterRadiusOffset={12}
					borderWidth={0}
					borderColor={{
						from      : 'color',
						modifiers : [['darker', 0.2]],
					}}
					enableArcLabels={false}
					enableArcLinkLabels={false}
					isInteractive
					animate
					colors={{ datum: 'data.color' }}
					defs={[
						{
							id: 'dots',

							size    : 0,
							padding : 0,
							stagger : false,
						},
						{
							id         : 'lines',
							type       : 'patternLines',
							background : 'inherit',
							color      : 'rgba(255, 255, 255, 1)',
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
							translateX    : 65,
							translateY    : 55,
							itemsSpacing  : 5,
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
										itemTextColor : '#000',
										symbolSize    : 26,
										transition    : 'all 0.3s ease',
									},
								},
							],
						},
					]}
				/>
			</div> */}
		</div>
	);
}

export default CombinedPieChart;
