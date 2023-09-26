import { TabPanel, Tabs, Button } from '@cogoport/components';
import React, { useState } from 'react';

import BudgetAllocationTab from './BudgetAllocationTab';
import DashboardTab from './DashboardTab';
import RuleSettingTab from './RuleSettingTab';
import styles from './styles.module.css';

function BudgetAllocation() {
	const [activeTab, setActiveTab] = useState('dashboard');
	const [formButton, setFormButton] = useState(false);

	return (
		<div>
			<h1>Promotions</h1>
			<div>
				<Tabs activeTab={activeTab} themeType="primary" onChange={setActiveTab}>
					<TabPanel name="dashboard" key="dashboard" title="Dashboard">
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
							{!formButton && activeTab === 'budget_allocation' ? (
								<div
									style={{
										display        : 'flex',
										justifyContent : 'flex-end',
										marginTop      : '10px',
									}}
								>
									<Button
										className="primary sm"
										onClick={() => setFormButton((prev) => !prev)}
									>
										ALLOCATE
									</Button>
								</div>
							) : null}
							<BudgetAllocationTab
								formButton={formButton}
								setFormButton={setFormButton}
							/>
						</div>
					</TabPanel>

					<TabPanel name="rule_setting" key="rule_setting" title="Rule Setting">
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
