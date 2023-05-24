import { Tabs, TabPanel, Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import tabPanelComponentMapping from '../../constants/tab-panel-component-mapping';

import styles from './styles.module.css';

function HRDashboard() {
	const router = useRouter();

	const [activeTab, setActiveTab] = useState('feedbacks');
	const [modal, setModal] = useState(''); // for update,logs,create,upload modals

	const routeToFeedbackForms = () => {
		router.push('/performance-management/hr-dashboard/feedback-forms');
	};
	const tabPanels = tabPanelComponentMapping.hr_dashboard;

	return (
		<div className={styles.container}>
			<div className={styles.top_most_container}>
				<div className={styles.header}>
					HR Dashboard
				</div>
				<div className={styles.question_button_container}>
					<Button
						size="lg"
						themeType="primary"
						onClick={() => routeToFeedbackForms()}
					>
						Create New Form
					</Button>
				</div>
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
								<Component key={panel.key} modal={modal} setModal={setModal} logType={activeTab} />
							</TabPanel>
						);
					})}

				</Tabs>
			</div>

		</div>
	);
}

export default HRDashboard;
