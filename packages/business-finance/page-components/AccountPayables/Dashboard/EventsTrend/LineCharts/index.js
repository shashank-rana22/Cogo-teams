import { ResponsiveLine } from '@cogoport/charts/line';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { format } from '@cogoport/utils';
import React from 'react';

import { dateDay } from '../../Constants';

import styles from './styles.module.css';

function LineCharts({ data, isCountView, showData, currency }) {
	const sales = data?.[0] || [];
	const sales1 = data?.[1] || [];
	const sales2 = data?.[2] || [];

	const config = {
		mapping: [{
			key   : 'date',
			value : isCountView ? 'count' : 'amount',
		}],
		graphData: [sales],
	};
	const { graphData = [], mapping = [] } = config;
	const bardata = (graphData || []).map((item, index) => ({
		data: item?.map((value) => ({
			x: showData === 'month' ? format(value?.[mapping[index]?.key] || '', 'MMM')
				: value?.[mapping[index]?.key] || '',
			y: `${Number(value?.[mapping[index]?.value])}` || 0,
		})),
	}));

	const config1 = {
		mapping1: [{
			key: 'date',
			value:
			isCountView ? 'smaOfCount' : 'smaOfAmount',
		}],
		smaOfData: [sales],
	};
	const { smaOfData = [], mapping1 = [] } = config1;
	const bardata1 = (smaOfData || []).map((item, index) => ({
		data: item?.map((value) => ({

			x: showData === 'month' ? format(value?.[mapping1[index]?.key] || '', 'MMM')
				: value?.[mapping1[index]?.key] || '',
			y: `${Number(value?.[mapping1[index]?.value])}` || 0,
		})),
	}));

	const dataForGraph = [
		{
			id   : isCountView ? 'Periodic Count' : 'Periodic Amount',
			data : bardata[0].data,
		},
		{
			id   : isCountView ? 'SMA Count' : 'SMA Amount',
			data : showData === 'lastThreeMonths' ? [] : bardata1[0].data,
		},
	];

	if (showData === 'day' && dataForGraph?.[GLOBAL_CONSTANTS.zeroth_index]?.data?.length > 15) {
		dataForGraph[GLOBAL_CONSTANTS.zeroth_index].data = dataForGraph[GLOBAL_CONSTANTS.zeroth_index]?.data
			.filter((_, index) => index % 2 === 0);
		dataForGraph[1].data = dataForGraph[1]?.data?.filter((_, index) => index % 2 === 0);
	}

	const DATA1 = [];
	const DATA1OBJ = {};

	dateDay.forEach((date) => {
		sales.forEach((sale) => {
			if (sale?.date.toString().slice(8, 10) === date) {
				DATA1OBJ[date] = isCountView ? sale?.count : sale?.amount;
			}
		});
		DATA1.push({
			x : date,
			y : DATA1OBJ?.[date] || 0,
		});
	});

	const LAST2 = [];
	const DATA2OBJ = {};

	dateDay.forEach((date) => {
		sales1.forEach((sale) => {
			if (sale?.date.toString().slice(8, 10) === date) {
				DATA2OBJ[date] = isCountView ? sale?.count : sale?.amount;
			}
		});
		LAST2.push({
			x : date,
			y : DATA2OBJ?.[date] || 0,
		});
	});

	const LAST3 = [];
	const DATA3OBJ = {};

	dateDay.forEach((date) => {
		sales2.forEach((sale) => {
			if (sale?.date.toString().slice(8, 10) === date) {
				DATA3OBJ[date] = isCountView ? sale?.count : sale?.amount;
			}
		});
		LAST3.push({
			x : date,
			y : DATA3OBJ?.[date] || 0,
		});
	});

	const lastThreeData = [
		{
			id   : format(sales[0]?.date, 'MMM yyyy'),
			data : DATA1,
		},
		{
			id   : format(sales1[0]?.date, 'MMM yyyy'),
			data : LAST2,
		},
		{
			id   : format(sales2[0]?.date, 'MMM yyyy'),
			data : LAST3,
		},
	];
	const formatPrice = (value) => {
		const formattedValue = formatAmount({
			amount  : value,
			currency,
			options : {
				style           : 'currency',
				compactDisplay  : 'short',
				currencyDisplay : 'code',
				notation        : 'compact',
				currencyWise    : true,
			},

		});
		if (isCountView) {
			return null;
		}

		return `${formattedValue}`;
	};

	return (
		<div className={styles.line}>
			<ResponsiveLine
				data={showData === 'lastThreeMonths' ? lastThreeData : dataForGraph}
				margin={{ top: 50, right: 120, bottom: 50, left: 90 }}
				xScale={{ type: 'point' }}
				enableGridX={false}
				colors={showData === 'lastThreeMonths' ? ['#88CAD1', '#F68B21', '#ABCD62'] : ['#88CAD1', '#F68B21']}
				enableSlices="x"
				yScale={{
					type : 'linear',
					min  : 0,
					max  : 'auto',
				}}
				yFormat={isCountView ? ' >-.2f' : (value) => formatAmount({
					amount  : value,
					currency,
					options : {
						currencyDisplay : 'code',
						style           : 'currency',
					},
				})}
				axisTop={null}
				axisRight={null}
				axisBottom={{
					tickSize       : 5,
					tickPadding    : 10,
					legend         : showData === 'month' ? 'Month' : 'Date',
					legendOffset   : 44,
					legendPosition : 'middle',
				}}
				axisLeft={{
					tickSize       : 5,
					tickPadding    : 5,
					tickRotation   : 0,
					legend         : isCountView ? 'Count' : 'Amount',
					legendOffset   : isCountView ? -60 : -84,
					legendPosition : 'middle',
					format         : formatPrice,
				}}
				pointSize={5}
				pointBorderWidth={2}
				pointBorderColor={{ from: 'serieColor' }}
				pointLabelYOffset={-12}
				useMesh
				legends={[
					{
						anchor            : 'bottom-right',
						direction         : 'column',
						justify           : false,
						translateX        : 100,
						translateY        : 0,
						itemsSpacing      : 0,
						itemDirection     : 'left-to-right',
						itemWidth         : 80,
						itemHeight        : 20,
						itemOpacity       : 0.75,
						symbolSize        : 12,
						symbolShape       : 'circle',
						symbolBorderColor : 'rgba(0, 0, 0, .5)',
						effects           : [
							{
								on    : 'hover',
								style : {
									itemBackground : 'rgba(0, 0, 0, .03)',
									itemOpacity    : 1,
								},
							},
						],
					},
				]}
			/>

		</div>
	);
}

export default LineCharts;
