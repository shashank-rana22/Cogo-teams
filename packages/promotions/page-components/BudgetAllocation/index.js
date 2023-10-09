import { TabPanel, Tabs, Toggle } from '@cogoport/components';
import { useHandleVersionChangeToOld } from '@cogoport/next';
import React, { useState } from 'react';

import BudgetAllocationTab from './BudgetAllocationTab';
import DashboardTab from './DashboardTab';
import RuleSettingTab from './RuleSettingTab';
import styles from './styles.module.css';

function BudgetAllocation() {
	const { handleRouteChange } = useHandleVersionChangeToOld({});

	const [activeTab, setActiveTab] = useState('dashboard');

	return (
		<div>
			<div className={styles.container}>
				<h1>Promotions</h1>
				<Toggle
					size="md"
					onLabel="Old"
					offLabel="New"
					onChange={handleRouteChange}
				/>
			</div>
			<div>
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={setActiveTab}
				>
					<TabPanel
						name="dashboard"
						key="dashboard"
						title="Dashboard"
					>
						<div className={styles.tab_margin}>
							<DashboardTab />
						</div>
					</TabPanel>

					<TabPanel
						name="budget_allocation"
						key="budget_allocation"
						title="Budget Allocation"
					>
						<div className={styles.tab_margin}>
							<BudgetAllocationTab />
						</div>
					</TabPanel>

					<TabPanel
						name="rule_setting"
						key="rule_setting"
						title="Rule Setting"
					>
						<div className={styles.tab_margin}>
							<RuleSettingTab />
						</div>
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
}

export default BudgetAllocation;
