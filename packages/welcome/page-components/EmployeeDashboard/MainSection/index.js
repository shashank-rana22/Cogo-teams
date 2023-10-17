import React from 'react';

import PhoenixPerformance from './PhoenixPerformance';
import styles from './styles.module.css';
import YourBoard from './YourBoard';
// import YourPerformance from './YourPerformance';

function MainSection() {
	return (
		<div className={styles.container}>
			<div className={styles.left_section}>
				<PhoenixPerformance />
			</div>
			<div className={styles.right_section}>
				<YourBoard />
			</div>
		</div>
	);
}

export default MainSection;
