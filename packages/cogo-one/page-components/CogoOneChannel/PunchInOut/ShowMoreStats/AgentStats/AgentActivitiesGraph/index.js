import { ResponsiveBar } from '@cogoport/charts/bar';

import data from '../../../../../../configurations/dummy-data';

import styles from './styles.module.css';

function AgentActivityGraph() {
	return (
		<div className={styles.content}>
			<ResponsiveBar
				data={data}
				keys={[
					'fries',
					'donut',
				]}
				indexBy="country"
				margin={{ top: 20, right: 30, bottom: 70, left: 60 }}
				padding={0.7}
				groupMode="grouped"
				valueScale={{ type: 'linear' }}
				indexScale={{ type: 'band', round: true }}
				colors={['#88CAD1', '#CFEAED']}
				axisTop={null}
				axisRight={null}
				axisBottom={{
					tickSize       : 2,
					tickPadding    : 5,
					tickRotation   : 0,
					legend         : '',
					legendPosition : 'middle',
					legendOffset   : 32,
				}}
				axisLeft={null}
				// axisLeft={{
				// 	tickSize       : 5,
				// 	tickPadding    : 5,
				// 	tickRotation   : 0,
				// 	legend         : 'food',
				// 	legendPosition : 'middle',
				// 	legendOffset   : -40,
				// }}
				enableLabel={false}
				labelSkipWidth={12}
				labelSkipHeight={12}
				// labelTextColor={{
				// 	from      : 'color',
				// 	modifiers : [
				// 		[
				// 			'darker',
				// 			1.6,
				// 		],
				// 	],
				// }}
				legends={[
					{
						dataFrom      : 'keys',
						anchor        : 'bottom-left',
						direction     : 'row',
						justify       : false,
						translateX    : 4,
						translateY    : 47,
						itemsSpacing  : 2,
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
				ariaLabel="Nivo bar chart demo"
				barAriaLabel={(e) => `${e.id}: ${e.formattedValue} in country: ${e.indexValue}`}
			/>
		</div>
	);
}

export default AgentActivityGraph;
