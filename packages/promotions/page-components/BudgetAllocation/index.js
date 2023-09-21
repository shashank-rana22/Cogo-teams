import { TabPanel, Tabs } from '@cogoport/components';
import React, { useState } from 'react';

import BudgetAllocationTab from './BudgetAllocationTab';
import DashboardTab from './DashboardTab';
import RuleSettingTab from './RuleSettingTab';
import styles from './styles.module.css';

function BudgetAllocation() {
	const [activeTab, setActiveTab] = useState('dashboard');
	return (
		<div>
			<h1>Promotions</h1>
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
						<div className={styles.tabMargin}>
							<DashboardTab />
						</div>
					</TabPanel>

					<TabPanel
						name="budget_allocation"
						key="budget_allocation"
						title="Budget Allocation"
					>
						<div className={styles.tabMargin}>
							<BudgetAllocationTab />
						</div>
					</TabPanel>

					<TabPanel
						name="rule_setting"
						key="rule_setting"
						title="Rule Setting"
					>
						<div className={styles.tabMargin}>
							<RuleSettingTab />
						</div>
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
}

export default BudgetAllocation;
