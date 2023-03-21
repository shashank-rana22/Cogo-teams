import { ResponsiveBar } from '@cogoport/charts/bar';
import React from 'react';

// import useGetAgePayable from '../../hooks/useGetAgePayable';

import styles from './styles.module.css';

// const data1 = [
// 	{
// 		id: 'Not Due', value: 115,
// 	},
// 	{
// 		id: '1-30', value: 150,
// 	},
// 	{
// 		id: '31-60', value: 170,
// 	},
// 	{
// 		id: '61-90', value: 120,
// 	},
// 	{
// 		id: '91-180', value: 115,
// 	},
// 	{
// 		id: '181-365', value: 115,
// 	},
// 	{
// 		id: '>365', value: 115,
// 	},
// ];

function BarChart({ data }) {
	// const { data } = useGetAgePayable();
	const { ageingBucket = [] } = data || {};

	return (
		<div>

			<div className={styles.bar}>
				<ResponsiveBar
					data={ageingBucket}
					indexBy="ageingDuration"
					keys={['ledgerAmount']}
					margin={{ top: 50, right: 30, bottom: 40, left: 0 }}
					padding={0.6}
					enableGridY={false}
					valueScale={{ type: 'linear' }}
					indexScale={{ type: 'band', round: true }}
					colors={['#FCEDBF']}
					layout="vertical"
					groupMode="grouped"
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
						tickSize     : 0,
						tickPadding  : 10,
						tickRotation : 0,
					}}
					axisLeft={{
						tickSize     : 0,
						tickPadding  : 8,
						tickRotation : 0,
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
					legends={[
						{
							dataFrom      : 'keys',
							anchor        : 'bottom-right',
							direction     : 'row',
							justify       : false,
							translateX    : 20,
							translateY    : -280,
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

		</div>
	);
}

export default BarChart;
