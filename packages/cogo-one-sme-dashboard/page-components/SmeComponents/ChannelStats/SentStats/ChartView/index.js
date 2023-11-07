import { ResponsiveRadialBar } from '@cogoport/charts/radial-bar';
import React from 'react';

import { PercentageChange } from '../../../../../common/Elements';

import getChartData from './getChartData';
import styles from './styles.module.css';

function ChartView({
	channelType = '',
	currentData = {},
	previousData = {},
	msgType = '',
}) {
	const { chartData = [], legends = [] } = getChartData({
		channelType,
		currentData,
		msgType,
		previousData,
	});

	return (
		<div className={styles.container}>
			<div className={styles.chart_container}>
				<ResponsiveRadialBar
					data={chartData}
					valueFormat=">-.2f"
					endAngle={360}
					innerRadius={0.2}
					padding={0.45}
					colors={{ datum: 'data.color' }}
					cornerRadius={45}
					margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
					borderColor={{
						from      : 'color',
						modifiers : [
							[
								'darker',
								'0.7',
							]],
					}}
					isInteractive={false}
					enableRadialGrid={false}
					enableCircularGrid={false}
					radialAxisStart={null}
					circularAxisOuter={null}
					labelsSkipAngle={14}
					labelsRadiusOffset={0.45}
					legends={[]}
				/>
			</div>

			<div className={styles.chart_labels}>
				{legends.map(
					(itm) => (
						<div key={itm?.name}>
							<div className={styles.legends_header}>
								<div
									className={styles.circle_dot}
									style={{ background: itm?.color }}
								/>
								{itm?.label}
								{' '}
								-
								<span>
									{itm?.value}
									%
								</span>
							</div>
							<div className={styles.percentage_view}>
								<PercentageChange
									percentageChanged={itm?.change}
									showArrows
								/>
							</div>
						</div>
					),
				)}
			</div>
		</div>
	);
}

export default ChartView;
