import { ResponsiveBar } from '@cogoport/charts/bar/index';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { upperCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function ResponsiveBarChart({ barData = [], keys = [], handleBarChartOnClick = () => {} }) {
	return (
		<ResponsiveBar
			data={barData}
			keys={keys}
			indexBy="date"
			onClick={handleBarChartOnClick}
			margin={{ top: 100, right: 30, bottom: 80, left: 60 }}
			padding={0.3}
			valueScale={{ type: 'linear' }}
			indexScale={{ type: 'band', round: true }}
			colors={['#C4DC91', '#F8AEA8']}
			enableGridY
			enableLabel
			layout="vertical"
			groupMode="grouped"
			borderColor={{
				from: 'color', modifiers: [['darker',	1.6]],
			}}
			axisTop={null}
			axisRight={null}
			innerPadding={4}
			axisBottom={{
				tickSize       : 5,
				tickPadding    : 10,
				tickRotation   : 0,
				legend         : 'Date',
				legendOffset   : 44,
				legendPosition : 'middle',
			}}
			axisLeft={{
				tickSize       : 5,
				tickPadding    : 5,
				tickRotation   : 0,
				legend         : 'Count',
				legendOffset   : -50,
				legendPosition : 'middle',
			}}
			labelSkipWidth={36}
			labelSkipHeight={12}
			labelTextColor={{
				from: 'color', modifiers: [['darker',	1]],
			}}
			tooltip={({ label, value }) => (
				<div className={styles.tooltip}>
					{upperCase(label?.split('-')[GLOBAL_CONSTANTS.zeroth_index])}
					{' '}
					:
					{' '}
					<tspan color="#000">
						{value}
					</tspan>
				</div>
			)}
			layers={['grid', 'axes', 'bars', 'markers', 'legends',
				({ bars }) => (
					<g>
						{bars.map((bar) => (
							<text
								key={bar.data.id}
								x={bar.x + bar.width / 2}
								y={bar.y + bar.height / 2}
								textAnchor="start"
								transform={`rotate(-90,${bar.x + bar.width / 2},${bar.y + bar.height / 2})`}
								style={{
									dominantBaseline : 'central',
									fontWeight       : '600',
									fontSize         : 12,
									fill             : '#333',
								}}
							>
								{bar.data.value}
							</text>
						))}
					</g>
				),
			]}
			legends={[
				{
					dataFrom      : 'keys',
					anchor        : 'top-right',
					direction     : 'row',
					justify       : false,
					translateY    : -30,
					translateX    : -80,
					itemsSpacing  : 60,
					itemWidth     : 100,
					itemHeight    : 30,
					itemDirection : 'left-to-right',
					itemOpacity   : 0.85,
					symbolSize    : 20,
					symbolShape   : 'circle',
				},
			]}
			role="application"
			animate
		/>
	);
}
export default ResponsiveBarChart;
