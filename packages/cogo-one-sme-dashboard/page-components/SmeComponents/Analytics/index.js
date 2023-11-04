import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';
// import { ResponsiveLine } from '@cogoport/charts/line';
import { cl } from '@cogoport/components';
import React, { useState, useEffect } from 'react';

// chart type

import getGraphData from './getGraphData';
import styles from './styles.module.css';

const FILTER_CONTROLS = ['1D', '1W', '1M', '6M', '1Y'];

const GRAPH_LEGENDS = [
	{
		label : 'Search',
		color : '#F9AE64',
	},
	{
		label : 'Quotation',
		color : '#ABB0DE',
	},
	{
		label : 'Transaction',
		color : '#034AFD',
	},
	{
		label : 'Cancellation',
		color : '#F37166',
	},
	{
		label : 'New Accounts',
		color : '#C4DC91',
	},
];

function Analytics() {
	const [selectedFilter, setSelectedFilter] = useState('1D');

	const dummyData = getGraphData();

	useEffect(
		() => {
			const root = am5.Root.new('chart_div_line_graph');

			root.setThemes([
				am5themes_Animated.new(root),
			]);

			const chart = root.container.children.push(
				am5xy.XYChart.new(
					root,
					{
						panX       : true,
						panY       : true,
						wheelX     : 'panX',
						wheelY     : 'zoomX',
						pinchZoomX : true,
					},
				),
			);

			chart.get('colors').set('step', 3);

			const cursor = chart.set(
				'cursor',
				am5xy.XYCursor.new(
					root,
					{},
				),
			);

			cursor.lineY.set('visible', false);

			const xAxis = chart.xAxes.push(
				am5xy.DateAxis.new(
					root,
					{
						maxDeviation : 0.3,
						baseInterval : {
							timeUnit : 'day',
							count    : 1,
						},
						renderer : am5xy.AxisRendererX.new(root, {}),
						tooltip  : am5.Tooltip.new(root, {}),
					},
				),
			);

			const yAxis = chart.yAxes.push(
				am5xy.ValueAxis.new(
					root,
					{
						maxDeviation : 0.3,
						renderer     : am5xy.AxisRendererY.new(root, {}),
					},
				),
			);

			GRAPH_LEGENDS.forEach((itm, index) => {
				const series = chart.series.push(
					am5xy.LineSeries.new(
						root,
						{
							name        : itm?.label,
							xAxis,
							yAxis,
							valueYField : `value${index + 1}`,
							valueXField : 'date',
							stroke      : am5.color(itm?.color || '#000'),
							tooltip     : am5.Tooltip.new(
								root,
								{
									labelText: `${itm?.label} {valueY}`,
								},
							),
						},
					),
				);

				series.strokes.template.setAll({
					strokeWidth: 2,
				});

				series.get('tooltip').get('background').set('fillOpacity', 0.5);

				series.data.setAll(dummyData);

				series.appear(1000);
			});

			root.dateFormatter.setAll({
				dateFormat : 'yyyy-MM-dd',
				dateFields : ['valueX'],
			});

			chart.appear(1000, 100);

			return () => {
				root.dispose();
			};
		},
		[dummyData],
	);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.label}>
					Analytics
				</div>

				<div className={styles.filter_container}>
					{FILTER_CONTROLS.map(
						(itm) => (
							<div
								key={itm}
								role="presentation"
								onClick={() => setSelectedFilter(itm)}
								className={cl`${styles.filter_element} 
									${selectedFilter === itm ? styles.selected_filter_element : ''}`}
							>
								{itm}
							</div>
						),
					)}
				</div>
			</div>

			{/* <div className={styles.graph_container}>
				<ResponsiveLine
					data={dummyData}
					margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
					xScale={{ type: 'point' }}
					yScale={{
						type    : 'linear',
						min    	: 'auto',
						max    	: 'auto',
						stacked : true,
						reverse : false,
					}}
					yFormat=" >-.2f"
					axisTop={null}
					axisRight={null}
					axisBottom={{
						tickSize    	  : 5,
						tickPadding    : 5,
						tickRotation   : 0,
						legend    	    : '',
						legendOffset   : 36,
						legendPosition : 'middle',
					}}
					axisLeft={{
						tickSize    	  : 5,
						tickPadding    : 5,
						tickRotation   : 0,
						legend    	    : '',
						legendOffset   : -40,
						legendPosition : 'middle',
					}}
					enablePoints={false}
					pointSize={2}
					pointColor={{ theme: 'background' }}
					pointBorderColor={{ from: 'serieColor' }}
					pointLabelYOffset={-24}
					useMesh
					legends={[
						{
							anchor    	   : 'top-right',
							direction    	: 'row',
							justify    	  : false,
							translateX    : 36,
							translateY    : -37,
							itemWidth    	: 66,
							itemHeight    : 26,
							itemsSpacing  : 8,
							symbolSize    : 11,
							symbolShape   : 'circle',
							itemDirection : 'left-to-right',
							itemTextColor : '#777',
							effects    	  : [
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
			</div> */}
			<div id="chart_div_line_graph" className={styles.graph_container} />
		</div>
	);
}

export default Analytics;
