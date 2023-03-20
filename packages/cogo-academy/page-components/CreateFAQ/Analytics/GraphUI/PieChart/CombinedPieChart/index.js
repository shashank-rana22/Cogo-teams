import { ResponsivePie } from '@cogoport/charts/pie';

import styles from './styles.module.css';

function CombinedPieChart({ pie_outer_data, pie_data }) {
	return (
		<div style={{ width: '100%', height: '100%' }}>
			<div className={styles.inner_pie}>
				<ResponsivePie
					data={pie_data}
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

			<div className={styles.outer_pie}>
				<ResponsivePie
					data={pie_outer_data}
					margin={{
						top    : 50,
						right  : 10,
						bottom : 80,
						left   : 40,
					}}
					innerRadius={0.8}
					padAngle={0}
					cornerRadius={0}
					activeOuterRadiusOffset={8}
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
					fill={[
						{
							match: {
								id: 'N/A',
							},
							id: 'dots',
						},
						{
							match: {
								id: 'N/A2',
							},
							id: 'dots',
						},
					]}
					legends={[
						{
							anchor        : 'bottom',
							direction     : 'column',
							justify       : false,
							translateX    : 140,
							translateY    : 76,
							itemsSpacing  : 3,
							itemWidth     : 80,
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
		</div>
	);
}

export default CombinedPieChart;
