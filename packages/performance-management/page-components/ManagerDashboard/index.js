import { TabPanel, Tabs, Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import tabPanelComponentMapping from '../../constants/tab-panel-component-mapping';

import styles from './styles.module.css';

function ManagerDashboard() {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState('past_stats');
	const [modal, setModal] = useState(''); // for update,logs,create,upload modals

	const handleClick = () => {
		router.push('/performance-management/manager-dashboard/feedback-management');
	};

	const tabPanels = tabPanelComponentMapping.manager_dashboard;

	return (
		<>
			<div className={styles.header}>
				<div className={styles.header_text}>
					Manager Dashboard
				</div>

				<Button
					themeType="primary"
					size="lg"
					onClick={() => {
						handleClick();
					}}
				>
					Submit Feedback
				</Button>
			</div>

			<div className={styles.tabs}>
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={setActiveTab}
					fullWidth
				>
					{tabPanels.map((panel) => {
						const { Component } = panel;
						return (
							<TabPanel name={panel.name} title={panel.title}>
								<Component
									key={panel.key}
									modal={modal}
									setModal={setModal}
									logType={activeTab}
									source="manager_dashboard"
								/>
							</TabPanel>
						);
					})}
				</Tabs>
			</div>
		</>
	);
}

export default ManagerDashboard;
