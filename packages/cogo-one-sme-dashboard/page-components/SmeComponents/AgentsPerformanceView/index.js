import { SingleDateRange } from '@cogoport/components';
import React, { useState } from 'react';

import Hierarchy from './Hierarchy';
import SelectedStats from './SelectedStats';
import styles from './styles.module.css';

function AgentsPerformanceView() {
	const [dateRange, setDateRange] = useState({});
	const [hierarchyData, setHierarchyData] = useState([]);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>
					Agents Performance View
				</div>

				<div className={styles.date_range}>
					<SingleDateRange
						placeholder="Enter Date"
						dateFormat="MM/dd/yyyy"
						name="date"
						onChange={setDateRange}
						value={dateRange}
						maxDate={new Date()}
						isClearable={false}
						isPreviousDaysAllowed
					/>
				</div>
			</div>

			<div className={styles.body_container}>
				<Hierarchy
					setHierarchyData={setHierarchyData}
					hierarchyData={hierarchyData}
				/>

				<SelectedStats
					hierarchyData={hierarchyData}
				/>
			</div>
		</div>
	);
}

export default AgentsPerformanceView;
