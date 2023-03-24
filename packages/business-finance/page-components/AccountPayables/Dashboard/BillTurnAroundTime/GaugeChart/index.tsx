// import { ResponsiveGauge } from '@cogoport/charts/gauge';
import React from 'react';

import styles from './styles.module.css';

// const data = [
// 	{
// 		id    : 'chart',
// 		value : 75,
// 		max   : 100,
// 	},
// ];
function GaugeChart() {
	return (
		<div className={styles.container}>
			{/* <ResponsiveGauge
				data={data}
				id="value"
				valueFormat=".2f"
				margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
				minValue={0}
				maxValue={100}
			/> */}

		</div>
	);
}

export default GaugeChart;
