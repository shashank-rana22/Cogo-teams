import React from 'react';

import Header from './Header';
import MainSection from './MainSection';
import styles from './styles.module.css';

function HrmsEmployeeDashboard() {
	return (
		<div className={styles.container}>
			<Header />
			<MainSection />
		</div>
	);
}

export default HrmsEmployeeDashboard;
