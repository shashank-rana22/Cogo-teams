import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';
import { cl } from '@cogoport/components';
import React, { useState, useEffect } from 'react';

import { LoadingState } from '../../../common/Elements';
import { FILTER_CONTROLS, GRAPH_LEGENDS } from '../../../constants/analyticsConstants';
import useSmeDashboardStats from '../../../hooks/useSmeDashboardStats';

import styles from './styles.module.css';

function Analytics({ widgetBlocks = null, filterParams = {} }) {
	const [selectedFilter, setSelectedFilter] = useState('1D');
	const xKey = FILTER_CONTROLS?.[selectedFilter]?.valueKey || 'hour';

	const {
		dashboardData = {},
		dashboardLoading = false,
	} = useSmeDashboardStats({
		widgetBlocks,
		filterParams,
		selectedFilter,
	});

	const { analytics_data = [] } = dashboardData || {};

	const analyticsData = analytics_data?.map((itm) => ({
		...itm,
		[xKey]: new Date(itm?.[xKey]).getTime(),
	}));

	useEffect(
		() => {
			if (dashboardLoading) {
				return () => {};
			}

			const root = am5.Root.new('chart_div_line_graph');
			root.setThemes([am5themes_Animated.new(root)]);

			const chart = root.container.children.push(
				am5xy.XYChart.new(root, {
					panX       : true,
					panY       : true,
					wheelX     : 'panX',
					wheelY     : 'zoomX',
					pinchZoomX : true,
				}),
			);

			chart.get('colors').set('step', 3);
			const cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}));
			cursor.lineY.set('visible', false);

			const xAxis = chart.xAxes.push(
				am5xy.DateAxis.new(root, {
					maxDeviation : 0.3,
					baseInterval : {
						timeUnit : xKey,
						count    : 1,
					},
					renderer : am5xy.AxisRendererX.new(root, {}),
					tooltip  : am5.Tooltip.new(root, {}),
				}),
			);

			const yAxis = chart.yAxes.push(
				am5xy.ValueAxis.new(root, {
					maxDeviation : 0.3,
					renderer     : am5xy.AxisRendererY.new(root, {}),
				}),
			);

			GRAPH_LEGENDS.forEach((itm) => {
				const series = chart.series.push(
					am5xy.LineSeries.new(root, {
						name        : itm?.label,
						xAxis,
						yAxis,
						valueYField : itm?.key,
						valueXField : xKey,
						stroke      : am5.color(itm?.color || '#000'),
						tooltip     : am5.Tooltip.new(
							root,
							{ labelText: `${itm?.label} {valueY}` },
						),
					}),
				);

				series.strokes.template.setAll({ strokeWidth: 2 });
				series.get('tooltip').get('background').set('fillOpacity', 0.5);
				series.data.setAll(analyticsData);
				series.appear(1000);
			});

			root.dateFormatter.setAll({
				dateFormat : FILTER_CONTROLS?.[selectedFilter]?.dateFormat,
				dateFields : ['valueX'],
			});

			chart.appear(1000, 100);

			return () => root.dispose();
		},
		[analyticsData, dashboardLoading, selectedFilter, xKey],
	);

	if (dashboardLoading) {
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<div className={styles.label}>
						Analytics
					</div>

					<div className={styles.filter_container}>
						{Object.keys(FILTER_CONTROLS).map(
							(itm) => (
								<div
									key={itm}
									className={cl`${styles.filter_element}  ${styles.disable_content}
										${selectedFilter === itm ? styles.selected_filter_element : ''}`}
								>
									{itm}
								</div>
							),
						)}
					</div>
				</div>

				<div className={styles.loading_container}>
					<LoadingState loaderCount={10} />
				</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.label}>
					Analytics
					{GRAPH_LEGENDS?.map((itm) => (
						<div className={styles.legend_item} key={itm?.key}>
							<div className={styles.legend_item_color} style={{ background: itm?.color }} />
							{itm?.label}
						</div>
					))}
				</div>

				<div className={styles.filter_container}>
					{Object.keys(FILTER_CONTROLS).map(
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

			<div id="chart_div_line_graph" className={styles.graph_container} />
		</div>
	);
}

export default Analytics;
