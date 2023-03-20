import { Tabs, TabPanel, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Filter from '../../../commons/Filters';

import Entity from './Entity';
import { monthControls } from './monthControls';
import styles from './styles.module.css';

function TreasuryStatistics() {
	const [monthFilter, setMonthFilter] = useState({ month: '' });
	const [activeTab, setActiveTab] = useState('ALL');
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading_text}>
					<div className={styles.text}>
						Treasury Statistics
						<div className={styles.hr} />
					</div>
					<Tooltip placement="top" content="jaiprakash">
						<div className={styles.info_icon}>
							<IcMInfo width="16px" height="16px" />
						</div>
					</Tooltip>
				</div>
				<div className={styles.segmented_filter}>
					<Filter controls={monthControls} filters={monthFilter} setFilters={setMonthFilter} />
				</div>
			</div>
			<div className={styles.tabs_container}>
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={setActiveTab}
				>
					<TabPanel name="ALL" title={<Entity entityCode="all" />}>
						{/* <div>This is local search</div> */}
					</TabPanel>

					<TabPanel name="101" title={<Entity entityCode="101" />}>
						{/* <div>This is suggested</div> */}
					</TabPanel>
					<TabPanel name="201" title={<Entity entityCode="201" />}>
						{/* <div>This is suggested</div> */}
					</TabPanel>
					<TabPanel name="301" title={<Entity entityCode="301" />}>
						{/* <div>This is suggested</div> */}
					</TabPanel>
					<TabPanel name="401" title={<Entity entityCode="401" />}>
						{/* <div>This is suggested</div> */}
					</TabPanel>
				</Tabs>
			</div>
			<div className={styles.funds_container}>
				<div className={styles.account}>
					<div className={styles.label_no}>
						No. of Accounts - 8
					</div>
					<div className={styles.vr} />
				</div>
				<div className={styles.funds}>
					<div className={styles.label}>
						Allocated Funds
					</div>
					<div className={styles.value}>
						INR 5,40,000
					</div>
				</div>
				<div className={styles.funds}>
					<div className={styles.label}>
						Utilized Funds
					</div>
					<div className={styles.value}>
						INR 4,40,000
					</div>
				</div>
				<div className={styles.funds}>
					<div className={styles.label}>
						Allocated Funds
					</div>
					<div className={styles.value}>
						INR 1,00,000
					</div>
				</div>

			</div>
		</div>
	);
}

export default TreasuryStatistics;
