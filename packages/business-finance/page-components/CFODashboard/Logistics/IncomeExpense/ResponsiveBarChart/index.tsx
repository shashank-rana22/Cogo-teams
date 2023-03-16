import { ResponsiveBar } from '@cogoport/charts/bar/index';
import React from 'react';

// import styles from './styles.module.css';

function ResponsiveBarChart({ barData }) {
	return (
		<ResponsiveBar
			data={barData}
			keys={['income', 'expense']}
			indexBy="months"
			margin={{ top: 100, right: 30, bottom: 80, left: 60 }}
			padding={0.6}
			valueScale={{ type: 'linear' }}
			indexScale={{ type: 'band', round: true }}
			colors={['#DDEBC0', '#ACDADF']}
			enableLabel
			enableGridY
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
			axisRight={null}
			innerPadding={8}
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
			labelSkipWidth={36}
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
	);
}
export default ResponsiveBarChart;
