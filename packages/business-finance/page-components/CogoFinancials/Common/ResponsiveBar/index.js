import { ResponsiveBar } from '@cogoport/charts/bar/index';
import React from 'react';

import styles from './styles.module.css';

function MyResponsiveBar({
	data = [],
	height = '385px',
	width = '100%',
	colors = ['#F9AE64', '#ACDADF'],
	keys = [
		'sandwich',
		'fries',
	],
	legendX = 'Duration',
	legendY = 'Amount',
	indexBy = 'Duration',
	enableGridY = false,
	enableGridX = false,
	onClick = () => {},
	enableLabel = true,
	legends = true,
	groupMode = 'stacked',
	valueFormat = () => {},
	margin = { top: 50, right: 130, bottom: 50, left: 60 },
	axisBottomRotation = 0,
	tooltip = () => {},
	axisLeft = {
		tickSize       : 0,
		tickPadding    : 0,
		tickRotation   : 0,
		legend         : legendY,
		legendPosition : 'middle',
		legendOffset   : -10,
		ariaHidden     : true,
		renderTick     : () => null,
	},
}) {
	return (
		<div style={{ width, height }} className={styles.container}>
			<ResponsiveBar
				enableLabel={enableLabel}
				data={data}
				keys={keys}
				indexBy={indexBy}
				margin={margin}
				padding={0.3}
				valueScale={{ type: 'linear' }}
				indexScale={{ type: 'band', round: true }}
				colors={colors}
				axisTop={null}
				axisRight={null}
				onClick={onClick}
				groupMode={groupMode}
				valueFormat={valueFormat}
				tooltip={tooltip}
				theme={{
					textColor : 'String',
					axis      : {
						ticks: {
							text: {
								fill     : '#000',
								fontSize : '10px',
							},
						},
					},
					grid: {
						line: {
							stroke: '#E6ECF1',
						},
					},
				}}
				axisBottom={{
					tickSize       : 0,
					tickPadding    : 10,
					tickRotation   : axisBottomRotation,
					legend         : legendX,
					legendPosition : 'middle',
					legendOffset   : 32,
				}}
				axisLeft={axisLeft}
				labelSkipWidth={14}
				labelSkipHeight={14}
				legends={legends ? [
					{
						dataFrom      : 'keys',
						anchor        : 'top-right',
						direction     : 'column',
						justify       : false,
						translateX    : 120,
						translateY    : 0,
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
				] : []}
				enableGridY={enableGridY}
				enableGridX={enableGridX}
				role="application"
				ariaLabel="bar chart"
				markers={[{
					axis      : 'y',
					value     : 0,
					lineStyle : {
						stroke      : 'rgba(0, 0, 0, .25)',
						strokeWidth : 1,
					},
				}]}
			/>
		</div>

	);
}
export default MyResponsiveBar;
