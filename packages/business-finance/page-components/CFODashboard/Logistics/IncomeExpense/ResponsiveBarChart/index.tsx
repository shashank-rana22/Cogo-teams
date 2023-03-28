import { ResponsiveBar } from '@cogoport/charts/bar/index';
import React from 'react';

import { getAmountInLakhCrK } from '../../getAmountInLakhCrK';

function ResponsiveBarChart({ barData }) {
	return (
		<ResponsiveBar
			data={barData}
			keys={['income', 'expense']}
			indexBy="month"
			margin={{ top: 100, right: 30, bottom: 80, left: 60 }}
			padding={0.6}
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
				tickSize: 0, tickPadding: 10, tickRotation: 0,
			}}
			axisLeft={{
				tickSize     : 0,
				tickPadding  : 4,
				tickRotation : 0,
				format       : (value) => `${getAmountInLakhCrK(value)}`,
			}}
			labelSkipWidth={36}
			labelSkipHeight={12}
			labelTextColor={{
				from: 'color', modifiers: [['darker',	1]],
			}}
			role="application"
			animate
		/>
	);
}
export default ResponsiveBarChart;
