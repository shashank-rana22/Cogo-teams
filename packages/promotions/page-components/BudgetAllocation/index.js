import { TabPanel, Tabs, Toggle } from '@cogoport/components';
import { useHandleVersionChangeToOld, dynamic } from '@cogoport/next';
import React, { useState } from 'react';

import styles from './styles.module.css';

const TABS = [
	{
		name      : 'dashboard',
		title     : 'Dashboard',
		Component : dynamic(() => import('./DashboardTab'), { ssr: false }),
	},
	{
		name      : 'budget_allocation',
		title     : 'Budget Allocation',
		Component : dynamic(() => import('./BudgetAllocationTab'), { ssr: false }),
	},
	{
		name      : 'rule_setting',
		title     : 'Rule Setting',
		Component : dynamic(() => import('./RuleSettingTab'), { ssr: false }),
	},
];

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
					{TABS.map((tab) => {
						const { Component, name, title } = tab;

						return (
							<TabPanel key={name} name={name} title={title}>
								<div className={styles.tab_margin}>
									<Component />
								</div>
							</TabPanel>
						);
					})}
				</Tabs>
			</div>
		</div>
	);
}

export default BudgetAllocation;
