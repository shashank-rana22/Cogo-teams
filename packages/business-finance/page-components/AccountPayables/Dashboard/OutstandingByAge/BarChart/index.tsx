import { ResponsiveBar } from '@cogoport/charts/bar';
import { Toggle } from '@cogoport/components';
import getFormattedPrice from '@cogoport/forms/utils/get-formatted-price';
import React, { useState } from 'react';

import { getAmountInLakhCrK } from '../../utils/getAmountInLakhCrK';

// import useGetAgePayable from '../../hooks/useGetAgePayable';

import styles from './styles.module.css';

const data1 = [
	{
		id: 'Not Due', value: 1187875,
	},
	{
		id: '1-30', value: 15876860,
	},
	{
		id: '31-60', value: 1987987,
	},
	{
		id: '61-90', value: 127660,
	},
	{
		id: '91-180', value: 1189755,
	},
	{
		id: '181-365', value: 165667815,
	},
	{
		id: '>365', value: 16757515,
	},
];

function BarChart({ data }) {
	// const { data } = useGetAgePayable();
	const { ageingBucket = [] } = data || {};
	const xAxisValue = 20;
	const [isLinearView, setIsLinearView] = useState(true);

	return (
		<div>
			<div className={styles.toggle}>
				<div className={styles.heading_text}>
					Logarithmic View
				</div>
				<Toggle
					name="linear_view"
					size="md"
					showOnOff
					value={isLinearView}
					onChange={() => setIsLinearView(!isLinearView)}
					disabled={false}
				/>
			</div>
			<div className={styles.bar}>
				<ResponsiveBar
					data={ageingBucket}
					indexBy="ageingDuration"
					keys={['ledgerAmount']}
					// data={data1}
					// indexBy="id"
					// keys={['value']}
					margin={{ top: 50, right: 30, bottom: 40, left: 8 }}
					padding={0.6}
					enableGridY={false}
					valueScale={{ type: isLinearView ? 'linear' : 'symlog' }}
					indexScale={{ type: 'band', round: true }}
					colors={['#FCEDBF']}
					layout="vertical"
					groupMode="grouped"
					yFormat=" >-.2f"
					borderColor={{
						from      : 'color',
						modifiers : [
							[
								'darker',
								1.6,
							],
						],
					}}
					axisTop={null}
					innerPadding={8}
					axisRight={null}
					minValue={0}
					axisBottom={{
						tickSize       : 0,
						tickPadding    : 10,
						tickRotation   : 0,
						legend         : 'Days',
						legendPosition : 'middle',
						legendOffset   : 32,
					}}
					axisLeft={{
						tickSize       : 0,
						tickPadding    : 8,
						tickRotation   : 0,
						legend         : 'Amount',
						legendPosition : 'middle',
						// legendOffset   : -40,
					}}
					labelSkipWidth={12}
					labelSkipHeight={12}
					labelTextColor={{
						from      : 'color',
						modifiers : [
							[
								'darker',
								1,
							],
						],
					}}
					label={(d) => (
						<tspan x={xAxisValue}>
							{getAmountInLakhCrK(
								d.value,
							)}
						</tspan>
					)}
					tooltip={({ label, value }) => (
						<strong className={styles.tooltip_style}>
							{/* {label?.split('-')[0]} */}
							{label}
							{' '}
							:
							{' '}
							<tspan color="#000">
								{getFormattedPrice(value, 'INR')}
							</tspan>
						</strong>
					)}
					legends={[
						{
							dataFrom      : 'keys',
							anchor        : 'bottom-right',
							direction     : 'row',
							justify       : false,
							translateX    : 120,
							translateY    : 280,
							itemsSpacing  : 50,
							itemWidth     : 100,
							itemHeight    : 20,
							itemDirection : 'left-to-right',
							itemOpacity   : 0.85,
							symbolShape   : 'circle',
							symbolSize    : 20,
							effects       : [
								{
									on    : 'hover',
									style : {
										itemOpacity: 0.7,
									},
								},
							],
						},
					]}
					role="application"
					animate
				/>
			</div>
			{/* <div className={styles.heading_text}>
				Days
			</div> */}
		</div>
	);
}

export default BarChart;
