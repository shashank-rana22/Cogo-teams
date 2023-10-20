import React from 'react';

// import CompanyPerformance from './CompanyPerformance';
// import PhoenixPerformance from './PhoenixPerformance';
import styles from './styles.module.css';
import YourBoard from './YourBoard';
import YourPerformance from './YourPerformance';

function MainSection({ data }) {
	console.log('data', data);
	return (
		<div className={styles.container}>
			<div className={styles.left_section}>
				{/* <CompanyPerformance /> */}
				<YourPerformance data={data} />
				{/* <PhoenixPerformance data={data} /> */}
			</div>
			<div className={styles.right_section}>
				<YourBoard />
			</div>
		</div>
	);
}

export default MainSection;
