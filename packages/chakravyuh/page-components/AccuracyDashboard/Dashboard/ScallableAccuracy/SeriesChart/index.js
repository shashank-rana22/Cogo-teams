import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive';
import * as am5xy from '@amcharts/amcharts5/xy';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import React, { useEffect } from 'react';

const STROKE_WIDTH = 2;
const INCREMENT = 1;

function SeriesChart({ loading = false, data = [], seriesIds = [] }) {
	useEffect(() => {
		const root = am5.Root.new('chartdiv');

		root.setThemes([
			am5themes_Animated.new(root), am5themes_Responsive.new(root),
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
					valueXField       : 'day',
					tension           : 0.5,
					minBulletDistance : 0,
					tooltip           : am5.Tooltip.new(root, {
						animationDuration: 0,
					}),
				}),
			);

			series.bullets.push(() => {
				const circle = am5.Circle.new(root, {
					interactive : true,
					radius      : 0,
					fill        : series.get('fill'),
				});

				circle.states.create('default', {
					opacity : 0,
					radius  : 0,
				});

				circle.states.create('hover', {
					opacity : 1,
					radius  : 6,
				});
				return am5.Bullet.new(root, {
					sprite: circle,
				});
			});

			series.strokes.template.set('strokeWidth', STROKE_WIDTH);

			series.get('tooltip').label.set('text', '\t\t\t\t{name}\n\n\t({valueX.formatDate()}) [bold]{valueY}');
			series.data.processor = am5.DataProcessor.new(root, {
				numericFields: [
					'day',
					'supply_rates',
					'rate_extension',
					'predicted',
					'cluster_extension',
				],
			});

			if (typeof data !== 'string') {
				series.data.setAll(data);
			}
		}

		seriesIds.forEach((id) => {
			createSeries(startCase(id), id);
		});

		function dataLoaded(result) {
			const resp = am5.JSONParser.parse(result.response);
			result.target.series.each((series) => {
				series.data.setAll(resp);
			});
		}

		if (typeof data === 'string') {
			am5.net.load(data, chart).then(dataLoaded);
		}

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

		let previousBulletSprites = [];
		const cursor = chart.get('cursor');
		function cursorMoved() {
			if (loading) return;
			for (let i = 0; i < previousBulletSprites.length; i += INCREMENT) {
				previousBulletSprites[i].unhover();
			}
			previousBulletSprites = [];
			chart.series.each((series) => {
				const { dataItem } = series.get('tooltip');
				if (dataItem?.bullets?.[GLOBAL_CONSTANTS.zeroth_index]) {
					const bulletSprite = dataItem.bullets[GLOBAL_CONSTANTS.zeroth_index].get('sprite');
					bulletSprite.hover();
					previousBulletSprites.push(bulletSprite);
				}
			});
		}
		cursor.events.on('cursormoved', cursorMoved);

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

		const hourglassanimation = hourglass.animate({
			key      : 'rotation',
			to       : 180,
			loops    : Infinity,
			duration : 2000,
			easing   : am5.ease.inOut(am5.ease.cubic),
		});

		if (loading) {
			hourglassanimation.play();
			indicator.show();
		} else {
			hourglassanimation.pause();
			indicator.hide();
		}

		return () => {
			if (root) {
				root.dispose();
			}
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(data), loading]);
	return (
		<div
			id="chartdiv"
			style={{ width: '100%', height: '100%' }}
		/>
	);
}

export default SeriesChart;
