import { BarDatum, ResponsiveBar } from '@cogoport/charts/bar';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

const TOOL_TIPS_STYLE = {
	fontSize     : '10px',
	background   : '#eee',
	padding      : '5px',
	borderRadius : '4px',
	zIndex       : 10,
	color        : '#000',
};

interface BarchartProps {
	currencyType?: string | number,
	data?: BarDatum[],
	margin?: object,
	dsoResponse?: boolean
}

const getAmountInLakhCrK = (value:number) => {
	const val = Math.abs(value);

	let formatedAmount = '';

	if (val >= 10000000) {
		formatedAmount = `${(val / 10000000).toFixed(2)} Cr`;
	} else if (val >= 100000) {
		formatedAmount = `${(val / 100000).toFixed(2)} Lac`;
	} else if (val >= 1000) {
		formatedAmount = `${(val / 1000).toFixed(2)} K`;
	}

	return formatedAmount;
};

export { getAmountInLakhCrK };

function BarChart({
	currencyType,
	data = [],
	margin = {},
	dsoResponse = false,
}: BarchartProps) {
	const AXIS_PADDING = {
		tickSize    : 0,
		tickPadding : 12,
		fill        : 'red',
	};

	function Bar() {
		return (
			<ResponsiveBar
				data={data}
				keys={dsoResponse ? ['dsoForTheMonth'] : ['value']}
				indexBy={dsoResponse ? 'month' : 'id'}
				margin={margin}
				colors={dsoResponse ? ['#DDEBC0'] : ['#FFD555']}
				layout="vertical"
				enableGridY={!!dsoResponse}
				axisLeft={AXIS_PADDING}
				padding={0.5}
				maxValue="auto"
				minValue="auto"
				borderRadius={5}
				animate={false}
				groupMode="grouped"
				isInteractive
				innerPadding={0}
				label=""
				tooltip={({ label, value }) => (
					<strong style={TOOL_TIPS_STYLE}>
						{label?.split('-')[0]}
						{' '}
						:
						{' '}
						<tspan color="#000">
							{formatAmount({
								amount   : value as any,
								currency : currencyType,
								options  : {
									currencyDisplay       : 'code',
									compactDisplay        : 'short',
									maximumFractionDigits : 2,
									style                 : 'currency',
								},
							})}
						</tspan>
					</strong>
				)}
				theme={{ axis: { legend: { text: { fontWeight: 600, fontSize: 14 } } } }}
				layers={['grid', 'axes', 'bars', 'markers', 'legends', ({ bars }) => (
					<g>
						{' '}
						{bars.map((bar) => (
							<text
								key={bar.data.id}
								x={bar.x + bar.width / 2}
								y={bar.y + bar.height / 2}
								textAnchor="start"
								transform={`rotate(-90,${bar.x + bar.width / 2},${bar.y + bar.height / 2})`}
								style={{ dominantBaseline: 'central', fontWeight: '600', fontSize: 11, fill: '#333' }}
							>
								{' '}
								{formatAmount({
									amount   : bar.data.value as any,
									currency : currencyType,
									options  : {
										notation              : 'compact',
										currencyDisplay       : 'code',
										compactDisplay        : 'short',
										maximumFractionDigits : 2,
										style                 : 'currency',
									},
								})}
								{' '}
								{' '}
							</text>
						))}
						{' '}
					</g>
				)]}
			/>

		);
	}
	return <Bar />;
}

export default BarChart;
