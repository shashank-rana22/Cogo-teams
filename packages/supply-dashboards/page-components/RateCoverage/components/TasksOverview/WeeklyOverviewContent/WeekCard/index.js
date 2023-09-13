import React from 'react';

import { WEEKLY_BACKLOG } from '../../../../configurations/helpers/constants';
import Card from '../../OverviewContent/Card';

import styles from './styles.module.css';

function WeekCard({ data = {}, statsLoading = false }) {
	return (
		<div className={styles.card_container}>
			<Card
				detail={WEEKLY_BACKLOG}
				data={data}
				activeCard="weekly_backlog_count"
				statsLoading={statsLoading}
			/>
		</div>
	);
}
export default WeekCard;
