import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive';
import * as am5xy from '@amcharts/amcharts5/xy';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useEffect } from 'react';

import { COLOR_MAPPINGS } from '../../../../../constants/pie_chart_config';

function ColumnChart({ loading = false, data = [], seriesIds = ['supply'] }) {
	useEffect(() => {
		const root = am5.Root.new('columnchartdiv');

		root.setThemes([
			am5themes_Animated.new(root), am5themes_Responsive.new(root),
		]);

		const chart = root.container.children.push(
			am5xy.XYChart.new(root, {
				panX               : false,
				panY               : false,
				wheelX             : 'panX',
				wheelY             : 'zoomX',
				layout             : root.verticalLayout,
				maxTooltipDistance : 0,
			}),
		);

		chart.get('colors').set(
			'colors',
			seriesIds.map((id) => am5.color(COLOR_MAPPINGS?.[id]?.[GLOBAL_CONSTANTS.zeroth_index])),
		);

		const cursor = chart.set('cursor', am5xy.XYCursor.new(root, {
			behavior: 'zoomX',
		}));

		cursor.lineY.set('visible', false);

		const xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
			baseInterval : { timeUnit: 'day', count: 1 },
			renderer     : am5xy.AxisRendererX.new(root, {
				minGridDistance: 60,
			}),
			tooltip: am5.Tooltip.new(root, {}),
		}));

		const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
			renderer: am5xy.AxisRendererY.new(root, {}),
		}));

		const series = chart.series.push(am5xy.ColumnSeries.new(root, {
			name        : 'Series',
			xAxis,
			yAxis,
			valueYField : 'rates_count',
			valueXField : 'day',
			tooltip     : am5.Tooltip.new(root, {
				labelText: '{valueY}',
			}),
		}));

		series.columns.template.setAll({ strokeOpacity: 0 });

		chart.set('scrollbarX', am5.Scrollbar.new(root, {
			orientation: 'horizontal',
		}));

		series.data.setAll(data);

		const indicator = root.container.children.push(am5.Container.new(root, {
			width      : am5.p100,
			height     : am5.p100,
			layer      : 1000,
			background : am5.Rectangle.new(root, {
				fill        : am5.color('#fdfbf6'),
				fillOpacity : 0.7,
			}),
		}));

		indicator.children.push(am5.Label.new(root, {
			text     : 'Hold on...',
			fontSize : 25,
			x        : am5.p50,
			y        : am5.p50,
			centerX  : am5.p50,
			centerY  : am5.p50,
		}));

		const hourglass = indicator.children.push(am5.Graphics.new(root, {
			width   : 32,
			height  : 32,
			fill    : am5.color('#221f20'),
			x       : am5.p50,
			y       : am5.p50,
			centerX : am5.p50,
			centerY : am5.p50,
			dy      : -45,
			svgPath : 'M12 5v10l9 9-9 9v10h24V33l-9-9 9-9V5H12zm20 29v5H16v-5l8-8 8 8zm-8-12-8-8V9h16v5l-8 8z',
		}));

		const hourGlassAnimation = hourglass.animate({
			key      : 'rotation',
			to       : 180,
			loops    : Infinity,
			duration : 2000,
			easing   : am5.ease.inOut(am5.ease.cubic),
		});

		if (loading) {
			hourGlassAnimation.play();
			indicator.show();
		} else {
			hourGlassAnimation.pause();
			indicator.hide();
		}

		return () => {
			root.dispose();
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading, JSON.stringify(data)]);

	return (
		<div
			id="columnchartdiv"
			style={{ width: '100%', height: '100%' }}
		/>
	);
}

export default ColumnChart;
