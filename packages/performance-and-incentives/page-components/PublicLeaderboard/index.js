import { useState } from 'react';

import { getTodayStartDate } from '../../utils/start-date-functions';

import Body from './components/Body';
import Header from './components/Header';
import useCountDown from './hooks/useCountDown';
import useGetLeaderbordList from './hooks/useGetLeaderbordList';
import styles from './styles.module.css';

function PublicDashboard() {
	const [view, setView] = useState('kam_wise');
	const [updatedAt, setUpdatedAt] = useState('');

	const [dateRange, setDateRange] = useState({
		startDate : getTodayStartDate(),
		endDate   : new Date(),
	});

	const { list, loading, total_report_count: totalReportCount, trigger } = useGetLeaderbordList({
		view,
		dateRange,
		pageLimit: 50,
		setUpdatedAt,
	});

	const { countdown } = useCountDown({ updatedAt, trigger });

	return (
		<div className={styles.container}>
			<Header
				view={view}
				setView={setView}
				dateRange={dateRange}
				setDateRange={setDateRange}
				updatedAt={updatedAt}
				countdown={countdown}
			/>

			<Body
				view={view}
				dateRange={dateRange}
				updatedAt={updatedAt}
				setUpdatedAt={setUpdatedAt}
				list={list}
				loading={loading}
				totalReportCount={totalReportCount}
			/>
		</div>
	);
}

export default PublicDashboard;
