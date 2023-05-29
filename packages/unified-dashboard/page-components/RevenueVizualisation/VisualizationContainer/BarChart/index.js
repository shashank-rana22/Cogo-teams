import { ResponsiveBar } from '@cogoport/charts/bar';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';
import React from 'react';

const tooltTipStyle = {
	fontSize     : '10px',
	background   : '#eee',
	padding      : '5px',
	borderRadius : '4px',
	zIndex       : 10,
	color        : '#000',
};

const getAmount = (amount) => formatAmount({
	amount   : amount || 0,
	currency : GLOBAL_CONSTANTS.currency_code.USD,
	options  : {
		style                 : 'currency',
		currencyDisplay       : 'symbol',
		notation              : 'compact',
		compactDisplay        : 'short',
		minimumFractionDigits : 2,
	},
});

function BarChart({
	data,
	buckets,
	setSelectedBarData,
	setSelectedPieData,
}) {
	const { keys, heading } = buckets || {};

	const handleBarClick = (val) => {
		const dataObj = {
			...val,
			type: heading,
		};

		setSelectedBarData(dataObj);
		setSelectedPieData();
	};

	const handleHover = (_, val) => {
		const event = val;
		event.target.style.cursor = 'pointer';
	};

	return (
		<ResponsiveBar
			data={data}
			keys={keys}
			indexBy="etd"
			margin={{
				top    : 40,
				right  : 20,
				bottom : 50,
				left   : 70,
			}}
			padding={0.3}
			groupMode="grouped"
			valueScale={{ type: 'linear' }}
			indexScale={{ type: 'band', round: true }}
			colors={['#FDE74D', '#F37166', '#F9AE64']}
			borderColor={{
				from      : 'color',
				modifiers : [['darker', 1.6]],
			}}
			onMouseEnter={(e, val) => handleHover(e, val)}
			axisTop={null}
			axisRight={null}
			axisBottom={{
				tickSize       : 5,
				tickPadding    : 5,
				tickRotation   : 0,
				legend         : 'Month',
				legendPosition : 'middle',
				legendOffset   : 32,
			}}
			axisLeft={{
				tickSize       : 5,
				tickPadding    : 5,
				tickRotation   : 0,
				tickValues     : 5,
				legend         : '$Mn',
				legendPosition : 'middle',
				legendOffset   : -65,
				format         : (value) => getAmount(value),
			}}
			labelSkipWidth={12}
			labelSkipHeight={12}
			labelTextColor={{
				from      : 'color',
				modifiers : [['darker', 1.6]],
			}}
			label={(d) => (
				<tspan
					x={10}
					y={-4}
					style={{ fontSize: '6px', transform: 'rotate(50deg)' }}
				>
					{getAmount(d.value)}
				</tspan>
			)}
			onClick={(node) => handleBarClick(node)}
			tooltip={({ label, value }) => {
				const splitLabel = label.split('-');
				return (
					<strong style={tooltTipStyle}>
						{startCase(splitLabel[0])}
						{' '}
						-
						{splitLabel[1]}
						{' '}
						:
						{' '}
						<tspan color="#000">{getAmount(value)}</tspan>
					</strong>
				);
			}}
			legendLabel={(datum) => `${startCase(datum.id)}`}
			legends={[
				{
					dataFrom      : 'keys',
					anchor        : 'top-left',
					direction     : 'row',
					justify       : false,
					translateX    : -40,
					translateY    : -40,
					itemsSpacing  : 5,
					itemWidth     : 100,
					itemHeight    : 20,
					itemDirection : 'left-to-right',
					itemOpacity   : 0.85,
					symbolSize    : 20,
					effects       : [
						{
							on    : 'hover',
							style : {
								itemOpacity: 1,
							},
						},
					],
				},
			]}
			role="application"
		/>
	);
}

export default BarChart;
