import React from 'react';

import styles from './styles.module.css';
import YourBoard from './YourBoard';
import YourPerformance from './YourPerformance';

function MainSection({
	data, summaryData, loading, feedRefetch, setFilters,
	isEmployeeDashboardActive,
	setIsEmployeeDashboardActive, feedLoading,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.left_section}>
				<YourPerformance
					data={data}
					feedRefetch={feedRefetch}
					setFilters={setFilters}
					summaryData={summaryData}
					isEmployeeDashboardActive={isEmployeeDashboardActive}
					setIsEmployeeDashboardActive={setIsEmployeeDashboardActive}
					feedLoading={feedLoading}
				/>
			</div>
			<div className={styles.right_section}>
				<YourBoard data={summaryData} loading={loading} />
			</div>
		</div>
	);
}

export default MainSection;
