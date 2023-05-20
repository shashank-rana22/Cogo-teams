import { IcMCross } from '@cogoport/icons-react';
import React from 'react';

import TrendsChart from './Chart';
import styles from './styles.module.css';
import useGetPortTrends from './useGetPortTrends';
// import useGetSeaRoute from './useGetSeaRoute';

function TrendDetails({ activeTrend, setActiveTrend }) {
	// const { data } = useGetSeaRoute({ trend: activeTrend });
	const { trendData } = useGetPortTrends({ trend: activeTrend });
	return (
		<div className={styles.container}>
			<IcMCross
				onClick={() => setActiveTrend(null)}
				style={{
					justifyContent : 'flex-end',
					right          : '10px',
					position       : 'absolute',
					top            : '10px',
					cursor         : 'pointer',
					height         : '24px',
					width          : '24px',
					zIndex         : 2,
				}}
			/>
			<TrendsChart data={trendData} />
		</div>
	);
}

export default TrendDetails;
