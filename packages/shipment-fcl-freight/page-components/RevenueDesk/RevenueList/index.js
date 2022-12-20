import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

import CompletedJobs from './CompletedJobs';
import PendingJobs from './PendingJobs';
import styles from './styles.module.css';

function RevenueList() {
	const [activeTab, setActiveTab] = useState('pending');
	return (
		<div>
			<Tabs
				activeTab={activeTab}
				onChange={setActiveTab}
				suffix={<div className={styles.pagination_container}>Pagination</div>}
			>
				<TabPanel name="pending" title={<div className={styles.tab_label}>Pending Jobs</div>}>
					<PendingJobs />
				</TabPanel>

				<TabPanel name="completed" title={<div className={styles.tab_label}>Completed Jobs</div>}>
					<CompletedJobs />
				</TabPanel>
			</Tabs>
		</div>
	);
}
export default RevenueList;
