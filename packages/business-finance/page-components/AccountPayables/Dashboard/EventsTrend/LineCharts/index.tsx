import { ResponsiveLine } from '@cogoport/charts/line';
import getFormattedPrice from '@cogoport/forms/utils/get-formatted-price';
import { format } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function LineCharts({ data, isCountView, showData }) {
	const sales = data?.[0] || [];
	const sales1 = data?.[1] || [];
	const sales2 = data?.[2] || [];

	const config = {
		mapping: [{
			// label : isCountView ? 'Count' : 'Amount',
			key   : 'date',
			value : isCountView ? 'count' : 'amount',
		}],
		graphData: [sales],
		// color   : ['#B3E2BB', 'red'],
	};
	const { graphData = [], mapping = [] } = config;
	const bardata = (graphData || []).map((item, index) => ({

		// id   : mapping[index]?.label,
		// id   : 'Amount',
		data: item?.map((value) => ({
			x: showData === 'month' ? format(value?.[mapping[index]?.key] || '', 'MMM')
				: value?.[mapping[index]?.key] || '',
			y: `${Number(value?.[mapping[index]?.value])}` || 0,
		})),
	}));

	const config1 = {
		mapping1: [{
			// label : isCountView ? 'Count' : 'Amount',
			key: 'date',
			value:
			isCountView ? 'smaOfCount' : 'smaOfAmount',
		}],
		smaOfData: [sales],
		// color : '#B3E2BB',
	};
	const { smaOfData = [], mapping1 = [] } = config1;
	const bardata1 = (smaOfData || []).map((item, index) => ({

		// id   : mapping[index]?.label,
		// id   : 'Amount',
		data: item?.map((value) => ({

			x: showData === 'month' ? format(value?.[mapping1[index]?.key] || '', 'MMM')
				: value?.[mapping1[index]?.key] || '',
			y: `${Number(value?.[mapping1[index]?.value])}` || 0,
		})),
	}));

	const data3 = [
		{
			id   : isCountView ? 'Count' : 'Amount',
			data : bardata[0].data,
			// color : 'blue',
		},
		{
			id   : isCountView ? 'Average Count' : 'Average Amount',
			data : showData === 'lastThreeMonths' ? [] : bardata1[0].data,
			// color : 'red',
		},
	];
	console.log(data3, 'dataattttttttttttt');
	console.log(data3[0].id, 'id');

	const lastThreeMonthConfig1 = {
		lastThreeMonthMapping1: [{
			key   : 'date',
			value : isCountView ? 'count' : 'amount',
		}],
		lastThreeMonthdata1: [sales],
	};
	const lastThreeMonthConfig2 = {
		lastThreeMonthMapping2: [{
			key   : 'date',
			value : isCountView ? 'count' : 'amount',
		}],
		lastThreeMonthdata2: [sales1],
	};
	const lastThreeMonthConfig3 = {
		lastThreeMonthMapping3: [{
			key   : 'date',
			value : isCountView ? 'count' : 'amount',
		}],
		lastThreeMonthdata3: [sales2],
	};
	const { lastThreeMonthdata1 = [], lastThreeMonthMapping1 = [] } = lastThreeMonthConfig1;
	const lastThreeMonthBarData1 = (lastThreeMonthdata1 || []).map((item, index) => ({

		// id   : mapping[index]?.label,
		// id   : 'Amount',
		data: item?.map((value) => ({
			x: showData === 'month' ? format(value?.[lastThreeMonthMapping1[index]?.key] || '', 'MMM')
				: value?.[lastThreeMonthMapping1[index]?.key]?.slice(8, 10) || '',
			y: `${Number(value?.[lastThreeMonthMapping1[index]?.value])}` || 0,
		})),
	}));

	const { lastThreeMonthdata2 = [], lastThreeMonthMapping2 = [] } = lastThreeMonthConfig2;
	const lastThreeMonthBarData2 = (lastThreeMonthdata2 || []).map((item, index) => ({

		// id   : mapping[index]?.label,
		// id   : 'Amount',
		data: item?.map((value) => ({
			x: showData === 'month' ? format(value?.[lastThreeMonthMapping2[index]?.key] || '', 'MMM')
				: value?.[lastThreeMonthMapping2[index]?.key]?.slice(8, 10) || '',
			y: `${Number(value?.[lastThreeMonthMapping2[index]?.value])}` || 0,
		})),
	}));

	const { lastThreeMonthdata3 = [], lastThreeMonthMapping3 = [] } = lastThreeMonthConfig3;
	const lastThreeMonthBarData3 = (lastThreeMonthdata3 || []).map((item, index) => ({

		// id   : mapping[index]?.label,
		// id   : 'Amount',
		data: item?.map((value) => ({
			x: showData === 'month' ? format(value?.[lastThreeMonthMapping3[index]?.key] || '', 'MMM')
				: value?.[lastThreeMonthMapping3[index]?.key]?.slice(8, 10) || '',
			y: `${Number(value?.[lastThreeMonthMapping3[index]?.value])}` || 0,
		})),
	}));

	const lastThreeData = [
		{
			id   : 'March',
			data : lastThreeMonthBarData1[0].data,
		},
		{
			id   : 'Feb',
			data : lastThreeMonthBarData2[0].data,
		},
		{
			id   : 'Jan',
			data : lastThreeMonthBarData3[0].data,
		},
	];

	return (
		<div className={styles.line}>
			<ResponsiveLine
				data={showData === 'lastThreeMonths' ? lastThreeData : data3}
				margin={{ top: 50, right: 120, bottom: 50, left: 90 }}
				xScale={{ type: 'point' }}
				enableGridX={false}
				colors={showData === 'lastThreeMonths' ? ['#ED3726', '#F9DA7F', 'green'] : ['#ED3726', '#F9DA7F']}
				enableSlices="x"
				yScale={{
					type : 'linear',
					min  : 0,
					max  : 'auto',
				}}
				yFormat={isCountView ? ' >-.2f' : (value) => getFormattedPrice(value, 'INR')}
				axisTop={null}
				axisRight={null}
				axisBottom={{
					// orient         : 'bottom',
					tickSize       : 5,
					tickPadding    : 10,
					tickRotation   : showData === 'month' || showData === 'lastThreeMonths' ? 0 : 36,
					legend         : showData === 'daily' ? ' ' : 'Date',
					legendOffset   : 36,
					legendPosition : 'middle',
				}}
				axisLeft={{
					// orient         : 'left',
					tickSize       : 5,
					tickPadding    : 5,
					tickRotation   : 0,
					legend         : isCountView ? 'Count' : 'Amount',
					legendOffset   : isCountView ? -60 : -84,
					legendPosition : 'middle',
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
