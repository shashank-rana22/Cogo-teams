import { ResponsiveLine } from '@cogoport/charts/line';
import React from 'react';

import { CUSTOM_DATA, CUSTOM_THEME } from '../../../../constants/line_chart_config';
import { section_header } from '../styles.module.css';

import styles from './styles.module.css';

const CONSTANT_POINT_TWO = 0.2;
const CONSTANT_ZERO = 0;
const CONSTANT_TWENTY_FIVE = 25;
const CONSTANT_FIFTY = 50;
const CONSTANT_SEVENTY_FIVE = 75;
const CONSTANT_HUNDRED = 100;

function CustomTooltip({ point = { data: {} } }) {
	return (
		<div className={styles.tooltip_container}>
			<p className={styles.tooltip_date}>{point?.data?.x}</p>
			<p className={styles.tooltip_accuracy}>{`${point?.data?.y}% Accuracy`}</p>
		</div>
	);
}

function Accuracy() {
	return (
		<div className={styles.container}>
			<h3 className={section_header}>Rate Accuracy with Time</h3>
			<div className={styles.line_chart_container}>
				<ResponsiveLine
					data={CUSTOM_DATA}
					margin={{ top: 50, right: 40, bottom: 50, left: 60 }}
					xScale={{ type: 'point' }}
					yScale={{
						type    : 'linear',
						min     : '0',
						max     : '100',
						stacked : false,
						reverse : false,
					}}
					yFormat=" >-.0f"
					axisTop={null}
					axisRight={null}
					axisBottom={{
						tickSize       : 5,
						tickPadding    : 5,
						tickRotation   : 0,
						legendOffset   : 36,
						legendPosition : 'middle',
					}}
					axisLeft={{
						tickSize       : 5,
						tickPadding    : 5,
						tickRotation   : 0,
						legendOffset   : -40,
						legendPosition : 'middle',
						format         : (val) => `${val}%`,
						tickValues     : [
							CONSTANT_ZERO,
							CONSTANT_TWENTY_FIVE,
							CONSTANT_FIFTY,
							CONSTANT_SEVENTY_FIVE,
							CONSTANT_HUNDRED,
						],
					}}
					enableGridX
					enableGridY
					gridYValues={[CONSTANT_ZERO]}
					gridXValues={[CONSTANT_ZERO]}
					theme={CUSTOM_THEME}
					colors={['#FEF199', '#CFEAED', '#FBD1A6']}
					pointSize={6}
					pointColor={{ from: 'color', modifiers: [['brighter', CONSTANT_POINT_TWO]] }}
					pointBorderWidth={2}
					pointBorderColor={{ from: 'color', modifiers: [['darker', CONSTANT_POINT_TWO]] }}
					pointLabelYOffset={-12}
					useMesh
					legends={[
						{
							anchor            : 'top-left',
							direction         : 'row',
							justify           : false,
							translateX        : -35,
							translateY        : -45,
							itemsSpacing      : 0,
							itemDirection     : 'left-to-right',
							itemWidth         : 140,
							itemHeight        : 20,
							itemOpacity       : 0.95,
							symbolSize        : 12,
							symbolShape       : 'circle',
							symbolBorderColor : 'rgba(0, 0, 0, .5)',
							effects           : [
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
					tooltip={CustomTooltip}
				/>
			</div>
		</div>
	);
}

export default Accuracy;
