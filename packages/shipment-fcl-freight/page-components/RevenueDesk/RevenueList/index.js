import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

import CompletedJobs from './CompletedJobs';
import PendingJobs from './PendingJobs';
import styles from './styles.module.css';

function RevenueList({
	listData = {},
	page = 1,
	setClickedCard = () => {},
	clickedCard,
	setActiveTab = () => {},
	activeTab = 'pending',
	heading,
	controls = [],
	shipment_type,
}) {
	
	return (
		<div>
			<Tabs
				activeTab={activeTab}
				onChange={setActiveTab}
				suffix={<div className={styles.pagination_container}>Pagination</div>}
			>
				<TabPanel name="pending" title={<div className={styles.tab_label}>Pending Jobs</div>}>
					<PendingJobs
						data={listData}
						page={page}
						activeTab={activeTab}
						setClickedCard={setClickedCard}
						clickedCard={clickedCard}
						shipment_type={shipment_type}
					/>
				</TabPanel>

				<TabPanel name="completed" title={<div className={styles.tab_label}>Completed Jobs</div>}>
					{/* <CompletedJobs /> */}
				</TabPanel>
			</Tabs>
		</div>
	);
}
export default RevenueList;
