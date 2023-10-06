import { useState } from 'react';

import { getTodayStartDate } from '../../utils/start-date-functions';

import Body from './components/Body';
import Header from './components/Header';
import styles from './styles.module.css';

function PublicDashboard() {
	const [view, setView] = useState('kam_wise');

	const [dateRange, setDateRange] = useState({
		startDate : getTodayStartDate(),
		endDate   : new Date(),
	});

	return (
		<div className={styles.container}>
			<Header view={view} setView={setView} dateRange={dateRange} setDateRange={setDateRange} />

			<Body view={view} dateRange={dateRange} />
		</div>
	);
}

export default PublicDashboard;
