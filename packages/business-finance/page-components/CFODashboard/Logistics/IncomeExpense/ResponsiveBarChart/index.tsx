import { ResponsiveBar } from '@cogoport/charts/bar/index';
import React from 'react';

import { getAmountInLakhCrK } from '../getAmountInLakhCrK';

// import styles from './styles.module.css';

function ResponsiveBarChart({ barData }) {
	return (
		<ResponsiveBar
			data={barData}
			keys={['income', 'expense']}
			indexBy="month"
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
            	tickPadding  : 4,
            	tickRotation : 0,
				format       : (value) => `${getAmountInLakhCrK(value)}`,
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

			// legends={[
            // 	{
            // 		dataFrom: 'keys',
            		// anchor        : 'bottom-right',
            		// direction     : 'row',
            		// justify      : false,
            		// translateX    : 20,
            		// translateY    : -280,
            		// itemsSpacing : 50,
            		// itemWidth     : 100,
            		// itemHeight   : 20,
            		// itemDirection : 'left-to-right',
            		// itemOpacity  : 0.85,
            		// symbolShape  : 'circle',
            		// symbolSize   : 20,
            		// effects      : [
            		// 	{
            		// 		on    : 'hover',
            		// 		style : {
            		// 			itemOpacity: 0.7,
            		// 		},
            		// 	},
            		// ],
            // 	},
			// ]}
			// layers={[
			// 	 'grid',
			// 	 'axes',
			// 	 'bars',
			// 	 'markers',
			// 	 'legends',
			// 	 ({ bars }) => (
			// 		<g>
			// 			{bars.map((bar) => (
			// 				<text
			// 					key={bar.data.id}
			// 					x={bar.x + bar.width / 2}
			// 					y={bar.y + bar.height / 2}
			// 					textAnchor="start"
			// 					// transform={`rotate(-90,${bar.x + bar.width / 2},${bar.y + bar.height / 2})`}/
			// 					style={{
			// 						 dominantBaseline : 'central',
			// 						 fontWeight       : '600',
			// 						 fontSize         : 12,
			// 						 fill             : '#333',
			// 					}}
			// 				>
			// 					{getAmountInLakhCrK(bar.data.value)}
			// 				</text>
			// 			))}
			// 		</g>
			// 	),
			// ]}

			role="application"
			animate
		/>
	);
}
export default ResponsiveBarChart;
