import { ResponsiveBar } from '@cogoport/charts/bar';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import {
	OUTSTANDING_KEYS,
	ENTITY_CURRENCY,
} from '../../../../../constants/account-type';
import { barChartKeys } from '../../../../../constants/bar-chart-key';
import { BAR_COLORS, SERVICE_WISE_BAR_COLORS } from '../../../../../constants/color';

const TOOLTIP_STYLE = {
	fontSize     : '12px',
	background   : '#eee',
	padding      : '5px',
	borderRadius : '4px',
	zIndex       : 10,
	color        : '#000',
};
const LABEL_OFF_SET_FIFTY = 50;
const TEN = 10;
const TWO = 2;
const ZERO = 0;
const ONE_POINT_SIX = 1.6;
const TWO_EIGHT = 28;
const FIVE = 5;
const { zeroth_index } = GLOBAL_CONSTANTS || {};
function BarChart({ data = [], filterValues = {}, setSelectedBarData = () => {} }) {
	const { bifurcation_type, entity_code, view_type } = filterValues;

	const formattedData = (data || []).map((val) => ({
		...val,
		...SERVICE_WISE_BAR_COLORS,
	}));

	const finalData = bifurcation_type === 'service' ? formattedData : data;

	const getAmount = (amount, decimal = 2) => formatAmount({
		amount   : amount || ZERO,
		currency : ENTITY_CURRENCY[Number(bifurcation_type)],
		options  : {
			style                 : 'currency',
			notation              : 'compact',
			compactDisplay        : 'short',
			minimumFractionDigits : decimal,
		},
	});

	const handleHover = (_, val) => {
		const event = val;
		event.target.style.cursor = view_type === 'outstanding' ? 'pointer' : 'auto';
	};

	const barTotalsLayer = (props) => {
		const { bars, xScale, yScale } = props || {};

		const labelOffset = bifurcation_type === 'ageing_bucket' ? LABEL_OFF_SET_FIFTY : TEN;
		const LABEL_FONT_SIZE = 12;
		if (isEmpty(bars)) return null;
		// compute totals for each index/bar
		const TOTALS = {};
		const bandwidth = bars[zeroth_index].width;
		bars.forEach((bar) => {
			const { indexValue } = bar.data;
			if (!(indexValue in TOTALS)) {
				TOTALS[indexValue] = 0;
			}
			if (!bar.data.hidden) {
				TOTALS[indexValue] += bar.data.value;
			}
		});
		// place text elements above the bars
		const labels = Object.keys(TOTALS).map((indexValue) => {
			const x = xScale(indexValue) + bandwidth / TWO;
			const y = yScale(TOTALS[indexValue]) - labelOffset;
			return (
				<text
					key={`total.${indexValue}`}
					x={x}
					y={y}
					textAnchor="middle"
					fontWeight="bold"
					fontSize={LABEL_FONT_SIZE}
				>
					{getAmount(TOTALS[indexValue])}
				</text>
			);
		});

		return labels;
	};

	return (
		<ResponsiveBar
			data={finalData}
			keys={
				barChartKeys[
					bifurcation_type === 'overall' ? entity_code : bifurcation_type
				] || ['301', '101']
			}
			indexBy="duration"
			margin={{
				top    : 70,
				right  : 50,
				bottom : 50,
				left   : 100,
			}}
			padding={0.3}
			valueScale={{ type: 'linear' }}
			indexScale={{ type: 'band', round: true }}
			colors={
				bifurcation_type === 'service'
					? (d) => d.data[`${d.id}_color`]
					: BAR_COLORS
			}
			borderColor={{
				from      : 'color',
				modifiers : [['darker', ONE_POINT_SIX]],
			}}
			onClick={(node) => view_type === 'outstanding' && setSelectedBarData(node)}
			axisTop={null}
			axisRight={null}
			onMouseEnter={(e, val) => handleHover(e, val)}
			axisBottom={{
				tickSize       : 5,
				tickPadding    : 5,
				tickRotation   : 0,
				legend         : 'Duration',
				legendPosition : 'middle',
				legendOffset   : 40,
			}}
			axisLeft={{
				tickSize       : 5,
				tickPadding    : 5,
				tickRotation   : 0,
				legend         : 'Amount',
				legendPosition : 'middle',
				legendOffset   : -80,
				format         : (value) => getAmount(value, TWO),
			}}
			valueFormat={(value) => getAmount(value)}
			labelSkipWidth={12}
			labelSkipHeight={12}
			labelTextColor={{
				from      : 'color',
				modifiers : [['darker', ONE_POINT_SIX]],
			}}
			legendLabel={(datum) => (bifurcation_type === 'ageing_bucket'
				? `${OUTSTANDING_KEYS[datum.id]}`
				: `${startCase(datum.id)}`)}
			legends={[
				{
					dataFrom      : 'keys',
					anchor        : 'top-left',
					direction     : 'row',
					justify       : false,
					translateX    : -40,
					translateY    : -60,
					itemsSpacing  : bifurcation_type === 'ageing_bucket' ? TWO_EIGHT : FIVE,
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
			layers={['grid', 'axes', 'bars', barTotalsLayer, 'markers', 'legends']}
			role="application"
			ariaLabel="Nivo bar chart demo"
			// eslint-disable-next-line react/no-unstable-nested-components
			tooltip={({ id, value, indexValue }) => (
				<div style={TOOLTIP_STYLE}>
					<strong>
						{bifurcation_type === 'ageing_bucket'
							? `${OUTSTANDING_KEYS[id]} : `
							: `${startCase(id)} : `}
						{indexValue}
						{' '}
						:
						{' '}
						{getAmount(value)}
					</strong>
				</div>
			)}
		/>
	);
}

export default BarChart;
