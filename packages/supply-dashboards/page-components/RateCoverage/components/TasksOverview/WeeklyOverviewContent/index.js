import React from 'react';

import Cards from './Cards';
import styles from './styles.module.css';
import WeekCard from './WeekCard';

function WeeklyOverviewContent({ data = {}, statsLoading = false }) {
	return (
		<div className={styles.container}>
			<div>
				Here is this week&rsquo;s overview
			</div>
			<div className={styles.row}>
				<Cards data={data} statsLoading={statsLoading} />
				<WeekCard data={data} statsLoading={statsLoading} />
			</div>
		</div>
	);
}

export default WeeklyOverviewContent;
