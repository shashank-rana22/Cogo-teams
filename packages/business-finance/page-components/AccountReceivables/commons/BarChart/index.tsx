import { ResponsiveBar } from '@cogoport/charts/bar/index';
import { getFormattedPrice } from '@cogoport/forms';
import React from 'react';

const tooltTipStyle = {
	fontSize     : '10px',
	background   : '#eee',
	padding      : '5px',
	borderRadius : '4px',
	zIndex       : 10,
	color        : '#000',
};

interface BarchartProps {
	currencyType?: string,
	data?: object[],
	margin?: object,
	dsoResponse?: boolean
}

function BarChart({
	currencyType,
	data = [],
	margin = {},
	dsoResponse = false,
}: BarchartProps) {
	const axisPadding = {
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
				colors={dsoResponse ? ['#DDEBC0'] : ['#FCEDBF']}
				layout="vertical"
				enableGridY={!!dsoResponse}
				axisLeft={axisPadding}
				padding={0.1}
				maxValue="auto"
				minValue="auto"
				animate={false}
				groupMode="grouped"
				isInteractive
				innerPadding={0}
				label="false"
				tooltip={({ label, value }) => (
					<strong style={tooltTipStyle}>
						{label?.split('-')[0]}
						{' '}
						:
						{' '}
						<tspan color="#000">
							{getFormattedPrice(
								value,
								currencyType,
								{
									notation              : 'compact',
									compactDisplay        : 'short',
									maximumFractionDigits : 2,
									style                 : 'decimal',
								},
							)}
						</tspan>
					</strong>
				)}
			/>

		);
	}
	return <Bar />;
}

export default BarChart;
