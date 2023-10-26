import React from 'react';

// import CompanyPerformance from './CompanyPerformance';
// import PhoenixPerformance from './PhoenixPerformance';
import styles from './styles.module.css';
import YourBoard from './YourBoard';
import YourPerformance from './YourPerformance';

function MainSection({ data, summaryData, loading, feedRefetch, setFilters }) {
	console.log('data', data);
	return (
		<div className={styles.container}>
			<div className={styles.left_section}>
				<YourPerformance
					data={data}
					feedRefetch={feedRefetch}
					setFilters={setFilters}
					summaryData={summaryData}
				/>
			</div>
			<div className={styles.right_section}>
				<YourBoard data={summaryData} loading={loading} />
			</div>
		</div>
	);
}

export default MainSection;
