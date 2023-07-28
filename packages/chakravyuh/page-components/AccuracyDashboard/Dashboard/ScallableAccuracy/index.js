import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';
import { cl } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useEffect } from 'react';

import { section_container } from '../styles.module.css';

import styles from './styles.module.css';

const STROKE_WIDTH = 2;

function ScallableAccuracy({ accuracy = [] }) {
	const FINAL_DATA = [];
	const IDS = [];
	accuracy.forEach(({ id, data }) => {
		IDS.push(id);
		data.forEach(({ x, y }, idx) => {
			FINAL_DATA[idx] = {
				date : new Date(x).getTime(),
				...(FINAL_DATA[idx] || {}),
				[id] : y,
			};
		});
	});

	useEffect(() => {
		const root = am5.Root.new('chartdiv');

		root.setThemes([
			am5themes_Animated.new(root),
		]);

		const chart = root.container.children.push(
			am5xy.XYChart.new(root, {
				panY               : false,
				wheelY             : 'zoomX',
				layout             : root.verticalLayout,
				maxTooltipDistance : 0,
			}),
		);

		chart.get('colors').set('colors', [
			am5.color('#F9AE64'),
			am5.color('#63BEC8'),
			am5.color('#9BA0CB'),
			am5.color('#f37166'),
		]);

		const yAxis = chart.yAxes.push(
			am5xy.ValueAxis.new(root, {
				extraTooltipPrecision : 1,
				renderer              : am5xy.AxisRendererY.new(root, {}),
			}),
		);

		const xAxis = chart.xAxes.push(
			am5xy.DateAxis.new(root, {
				baseInterval : { timeUnit: 'day', count: 1 },
				renderer     : am5xy.AxisRendererX.new(root, {
					minGridDistance: 50,
				}),
			}),
		);

		function createSeries(name, field) {
			const series = chart.series.push(
				am5xy.SmoothedXLineSeries.new(root, {
					name,
					xAxis,
					yAxis,
					valueYField       : field,
					valueXField       : 'date',
					tension           : 0.5,
					tooltip           : am5.Tooltip.new(root, {}),
					minBulletDistance : 10,
				}),
			);

			series.bullets.push(() => am5.Bullet.new(root, {
				sprite: am5.Circle.new(root, {
					radius : 3,
					fill   : series.get('fill'),
				}),
			}));

			series.strokes.template.set('strokeWidth', STROKE_WIDTH);

			series.get('tooltip').label.set('text', '\t\t\t\t{name}\n\n\t({valueX.formatDate()}) [bold]{valueY}');
			series.data.setAll(FINAL_DATA);
		}

		IDS.forEach((id) => {
			createSeries(startCase(id), id);
		});

		chart.set('cursor', am5xy.XYCursor.new(root, {
			behavior: 'zoomXY',
			xAxis,
		}));

		xAxis.set('tooltip', am5.Tooltip.new(root, {
			themeTags: ['axis'],
		}));

		yAxis.set('tooltip', am5.Tooltip.new(root, {
			themeTags: ['axis'],
		}));

		return () => {
			if (root) {
				root.dispose();
			}
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(FINAL_DATA)]);
	return (
		<div className={cl`${styles.container} ${section_container}`}>
			<div
				id="chartdiv"
				style={{ width: '100%', height: '100%' }}
			/>
			<div className={styles.hide_logo} />
		</div>

	);
}

export default ScallableAccuracy;
