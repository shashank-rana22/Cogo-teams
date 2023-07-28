import { ResponsiveLine } from '@cogoport/charts/line';
import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import chartData from '../../configurations/line-chart-data';
import { LABLE_TYPE } from '../../constants';

import Header from './Header';
import LineChartLoader from './LoaderLineChart';
import styles from './styles.module.css';

function CustomToolTip({ point = {}, timeline = '' }) {
	return (
		<div className={styles.tooltip_box}>
			<div className={styles.tooltip_text}>
				<div className={styles.column}>
					<div>Customers</div>
					<div>{LABLE_TYPE[timeline].label}</div>
				</div>
				<div className={cl`${styles.column} ${styles.column_center} `}>
					<div>:</div>
					<div>:</div>
				</div>
				<div className={styles.column}>
					<div>{point.data.y || GLOBAL_CONSTANTS.zeroth_index}</div>
					<div>{point.data.x || GLOBAL_CONSTANTS.zeroth_index}</div>
				</div>
			</div>
		</div>
	);
}

function LineChart({
	graph = {},
	timeline = '',
	loading = false,
}) {
	const data = chartData({ graph, timeline }) || [];

	if (loading) {
		return <LineChartLoader />;
	}

	return (
		<div className={styles.main_container}>
			<Header graph={graph} />

			{isEmpty(graph) ? (
				<Image
					src={GLOBAL_CONSTANTS.image_url.empty_customer_card}
					alt="empty"
					width={200}
					height={200}
					className={styles.graph_empty}
				/>
			) : (
				<div className={styles.chart_container}>
					<ResponsiveLine
						data={data}
						margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
						xScale={{ type: 'point' }}
						yFormat=" >-.2f"
						axisTop={null}
						axisRight={null}
						axisBottom={{
							orient         : 'bottom',
							tickSize       : 5,
							tickPadding    : 5,
							tickRotation   : 0,
							legend         : LABLE_TYPE[timeline].label,
							legendOffset   : 36,
							legendPosition : 'middle',
						}}
						axisLeft={{
							orient         : 'left',
							tickSize       : 5,
							tickValues     : 5,
							tickPadding    : 5,
							tickRotation   : 0,
							legend         : 'Customers',
							legendOffset   : -40,
							legendPosition : 'middle',
						}}
						colors={['#C4C4C4', '#F98600']}
						enableGridX={false}
						pointSize={4}
						pointColor={{ theme: 'background' }}
						pointBorderWidth={4}
						pointBorderColor={{ from: 'serieColor' }}
						pointLabelYOffset={-12}
						useMesh
						tooltip={({ point }) => <CustomToolTip point={point} timeline={timeline} />}
					/>
				</div>
			)}
		</div>
	);
}
export default LineChart;
