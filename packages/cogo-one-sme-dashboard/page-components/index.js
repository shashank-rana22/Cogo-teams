import { startOfDay } from '@cogoport/utils';
import React, { useState } from 'react';

import Header from './Header';
import SmeComponents from './SmeComponents';
import styles from './styles.module.css';

function SmeDashboard() {
	const [filterParams, setFilterParams] = useState(
		() => ({
			date_range: {
				startDate : startOfDay(new Date()),
				endDate   : new Date(),
			},
			renderCount: 1,
		}),
	);

	return (
		<div className={styles.main_container}>
			<Header
				setFilterParams={setFilterParams}
				filterParams={filterParams}
			/>

			<SmeComponents
				filterParams={filterParams}
				key={filterParams?.renderCount}
			/>
		</div>
	);
}

export default SmeDashboard;
