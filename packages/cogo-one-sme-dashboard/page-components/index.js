import React, { useState } from 'react';

import Header from './Header';
import SmeComponents from './SmeComponents';
import styles from './styles.module.css';

function SmeDashboard() {
	const [filterParams, setFilterParams] = useState({});

	return (
		<div className={styles.main_container}>
			<Header
				setFilterParams={setFilterParams}
				filterParams={filterParams}
			/>
			<SmeComponents />
		</div>
	);
}

export default SmeDashboard;
