import React from 'react';

import useGetDashboardSummary from '../../hooks/useGetDashboardSummary';
import useListAllFeed from '../../hooks/useListAllFeed';

import Header from './Header';
import MainSection from './MainSection';
import styles from './styles.module.css';

function HrmsEmployeeDashboard() {
	const { data } = useListAllFeed();
	const { data : summaryData, loading } = useGetDashboardSummary();
	return (
		<div className={styles.container}>
			<Header summaryData={summaryData} />
			<MainSection data={data} summaryData={summaryData} loading={loading} />
		</div>
	);
}

export default HrmsEmployeeDashboard;
