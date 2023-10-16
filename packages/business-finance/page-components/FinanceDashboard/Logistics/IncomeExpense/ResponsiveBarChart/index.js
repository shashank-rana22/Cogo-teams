import { ResponsiveBar } from '@cogoport/charts/bar/index';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import { getAmountInLakhCrK } from '../../getAmountInLakhCrK';
import { getAmountLineChartInLakh } from '../../getAmountLineChartInLakh';

import styles from './styles.module.css';

function ResponsiveBarChart({ barData }) {
	const foundCurrency = barData.find((item) => item.currency);

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
			enableGridY
			enableLabel
			layout="vertical"
			groupMode="grouped"
			borderColor={{
				from: 'color', modifiers: [['darker',	1.6]],
			}}
			axisTop={null}
			axisRight={null}
			innerPadding={8}
			axisBottom={{
				tickSize: 0, tickPadding: 20, tickRotation: 0,
			}}
			axisLeft={{
				tickSize     : 0,
				tickPadding  : -10,
				tickRotation : 0,
				format       : (value) => `${getAmountInLakhCrK(value, foundCurrency?.currency)}`,
			}}
			labelSkipWidth={36}
			labelSkipHeight={12}
			labelTextColor={{
				from: 'color', modifiers: [['darker',	1]],
			}}
			tooltip={({ label, value, data }) => (
				<div className={styles.tooltip}>
					{label?.split('-')[0]}
					{' '}
					:
					{' '}
					<tspan color="#000">
						{formatAmount({
							amount   : (value || '')?.toString(),
							currency : data?.currency,
							options  : {
								currencyDisplay       : 'code',
								compactDisplay        : 'short',
								maximumFractionDigits : 2,
								style                 : 'currency',
							},
						})}
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
								{getAmountLineChartInLakh(bar.data.value)}
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
