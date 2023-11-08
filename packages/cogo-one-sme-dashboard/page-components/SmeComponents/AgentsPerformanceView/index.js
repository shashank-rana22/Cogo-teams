import { SingleDateRange } from '@cogoport/components';
import { startOfDay } from '@cogoport/utils';
import React, { useState } from 'react';

import useGetPerformanceData from '../../../hooks/useGetPerformanceData';

import Hierarchy from './Hierarchy';
import SelectedStats from './SelectedStats';
import styles from './styles.module.css';

function AgentsPerformanceView() {
	const [dateRange, setDateRange] = useState({
		startDate : startOfDay(new Date()),
		endDate   : new Date(),
	});

	const [hierarchyData, setHierarchyData] = useState([]);

	const {
		dashboardLoading = false,
		dashboardData,
	} = useGetPerformanceData({	hierarchyData, dateRange });

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>
					Agents Performance View
				</div>

				<div className={styles.date_range}>
					<SingleDateRange
						placeholder="Enter Date"
						dateFormat="dd/MM/yyyy"
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
					dashboardData={dashboardData}
					dashboardLoading={dashboardLoading}
				/>
			</div>
		</div>
	);
}

export default AgentsPerformanceView;
