import { IcMCross, IcMArrowBack, IcMArrowNext } from '@cogoport/icons-react';
import React from 'react';

import TrendsChart from './Chart';
import styles from './styles.module.css';
import useGetPortTrends from './useGetPortTrends';
// import useGetSeaRoute from './useGetSeaRoute';

function TrendDetails({ activeTrend, setActiveTrend }) {
	// const { data } = useGetSeaRoute({ trend: activeTrend });
	const { trendData, setPage, page, total_pages } = useGetPortTrends({ trend: activeTrend });
	return (
		<div className={styles.container}>
			<div className={styles.row}>
				{page < total_pages ? (
					<IcMArrowBack
						onClick={() => setPage(page + 1)}
						style={{
							cursor     : 'pointer',
							height     : '24px',
							width      : '24px',
							zIndex     : 2,
							marginLeft : 10,
						}}
					/>
				) : null}
				{page > 1 ? (
					<IcMArrowNext
						onClick={() => setPage(page - 1)}
						style={{
							cursor     : 'pointer',
							height     : '24px',
							width      : '24px',
							zIndex     : 2,
							marginLeft : 10,
						}}
					/>
				) : null}
				<IcMCross
					onClick={() => setActiveTrend(null)}
					style={{
						justifyContent : 'flex-end',
						right          : '10px',
						position       : 'absolute',
						cursor         : 'pointer',
						height         : '24px',
						width          : '24px',
						zIndex         : 2,
					}}
				/>
			</div>
			<TrendsChart data={trendData} />
		</div>
	);
}

export default TrendDetails;
