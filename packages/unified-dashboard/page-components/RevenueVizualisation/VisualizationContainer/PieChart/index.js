import { ResponsivePie } from '@cogoport/charts/pie';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';
import React from 'react';

import colors from '../../../../utils/pieColors';

import styles from './styles.module.css';

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

function PieChart({
	data,
	setSelectedPieData,
	selectedBarData,
	apiKey,
	setPage,
}) {
	const formattedData = data.map((val, index) => ({
		...val,
		color: colors[index],
	}));

	const handlePieChartClick = (val) => {
		const dataObj = {
			apiKey,
			type       : selectedBarData.type,
			sub_type   : val.id,
			label      : val.label,
			indexValue : selectedBarData.indexValue,
			barId      : selectedBarData.id,
		};

		setSelectedPieData(dataObj);
		setPage(1);
	};

	const handleHover = (_, val) => {
		const event = val;
		event.target.style.cursor = 'pointer';
	};

	return (
		<ResponsivePie
			data={formattedData}
			margin={{
				top    : 50,
				right  : 50,
				bottom : 50,
				left   : 50,
			}}
			innerRadius={0.5}
			padAngle={0.7}
			cornerRadius={3}
			activeOuterRadiusOffset={8}
			borderWidth={1}
			borderColor={{
				from      : 'color',
				modifiers : [['darker', 0.2]],
			}}
			onMouseEnter={(e, val) => handleHover(e, val)}
			colors={({ data: colorData }) => colorData.color}
			valueFormat={(value) => getAmount(value)}
			enableArcLinkLabels={false}
			enableArcLabels={false}
			onClick={(node) => handlePieChartClick(node)}
			tooltip={({ datum: { label, value } }) => (
				<div className={styles.pie_tooltip_container}>
					<div className={styles.text_pie}>
						{startCase(label)}
						{' '}
						:
						{getAmount(value)}
					</div>
				</div>
			)}
		/>
	);
}

export default PieChart;
