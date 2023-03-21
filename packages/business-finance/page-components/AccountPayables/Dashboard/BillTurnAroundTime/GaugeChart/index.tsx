// import ResponsiveGauge from '@cogoport/charts/gauge';
import React from 'react';

import styles from './styles.module.css';

// const data = [{ value: 50 }];
function GaugeChart() {
	return (
		<div className={styles.container}>
			{/* <ResponsiveGauge
				data={data}
				valueFormat=".2f"
				maxValue={100}
				margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
				arcWidth={0.2}
				arcPadding={0.1}
				cornerRadius={2}
				colors={['#FF0000', '#FFA500', '#00FF00']}
			/> */}
		</div>
	);
}

export default GaugeChart;
