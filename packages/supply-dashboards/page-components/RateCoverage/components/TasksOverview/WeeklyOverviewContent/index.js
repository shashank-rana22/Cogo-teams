import React from 'react';

import Cards from './Cards';
import styles from './styles.module.css';
import WeekCard from './WeekCard';

function WeeklyOverviewContent({ data = {}, statsLoading = false }) {
	const { statistics = {} } = data;
	return (
		<div className={styles.container}>
			<div className={styles.text}>
				Here is this week&rsquo;s overview
			</div>
			<div className={styles.row}>
				<Cards data={statistics} statsLoading={statsLoading} />
				<WeekCard
					data={statistics}
					statsLoading={statsLoading}
				/>
			</div>
		</div>
	);
}

export default WeeklyOverviewContent;
