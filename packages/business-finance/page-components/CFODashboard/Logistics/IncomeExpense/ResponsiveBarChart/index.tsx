import { ResponsiveBar } from '@cogoport/charts/bar/index';
import React from 'react';

import { getAmountInLakhCrK } from '../../getAmountInLakhCrK';
import { getAmountLineChartInLakh } from '../../getAmountLineChartInLakh';

function ResponsiveBarChart({ barData }) {
	return (
		<ResponsiveBar
			data={barData}
			keys={['income', 'expense']}
			indexBy="month"
			margin={{ top: 100, right: 30, bottom: 80, left: 60 }}
			padding={0.3}
			valueScale={{ type: 'linear' }}
			indexScale={{ type: 'band', round: true }}
			colors={['#DDEBC0', '#ACDADF']}
			enableLabel
			enableGridY
			layout="vertical"
			groupMode="grouped"
			borderColor={{
				from: 'color', modifiers: [['darker',	1.6]],
			}}
			axisTop={null}
			axisRight={null}
			innerPadding={8}
			minValue={0}
			axisBottom={{
				tickSize: 0, tickPadding: 20, tickRotation: 0,
			}}
			axisLeft={{
				tickSize     : 0,
				tickPadding  : -10,
				tickRotation : 0,
				format       : (value) => `${getAmountInLakhCrK(value, 'INR')}`,
			}}
			labelSkipWidth={36}
			labelSkipHeight={12}
			labelTextColor={{
				from: 'color', modifiers: [['darker',	1]],
			}}
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
								{getAmountLineChartInLakh(bar.data.value)}
							</text>
						))}
					</g>
				),
			]}
			role="application"
			animate
		/>
	);
}
export default ResponsiveBarChart;
