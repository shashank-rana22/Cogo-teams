import React from 'react';

import useListAllFeed from '../../hooks/useListAllFeed';

import Header from './Header';
import MainSection from './MainSection';
import styles from './styles.module.css';

function HrmsEmployeeDashboard() {
	const { data } = useListAllFeed();
	console.log('🚀 ~ file: index.js:11 ~ HrmsEmployeeDashboard ~ data:', data);
	return (
		<div className={styles.container}>
			<Header />
			<MainSection data={data} />
		</div>
	);
}

export default HrmsEmployeeDashboard;
