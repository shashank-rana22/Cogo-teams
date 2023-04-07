import { TabPanel, Tabs, Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import PIPProbations from '../HRDashboard/TabComponents/PIPProbations';
import Statistics from '../HRDashboard/TabComponents/PIPProbations/Dashboard/Statistics';

import styles from './styles.module.css';
import PastStats from './TabComponents/PastStats';

function ManagerDashboard() {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState('past_stats');
	const [modal, setModal] = useState(''); // for update,logs,create,upload modals

	const handleClick = () => {
		router.push('/performance-management/manager-dashboard/feedback-management');
	};

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
					<TabPanel name="past_stats" title="KPI Feedbacks">
						<PastStats />
					</TabPanel>
					<TabPanel name="pip" title="PIP">
						<div className={styles.stats}><Statistics logType="pip" /></div>
						<PIPProbations
							key="pip"
							modal={modal}
							setModal={setModal}
							logType={activeTab}
							source="manager_dashboard"
						/>
					</TabPanel>

					<TabPanel name="probation" title="Probation">
						<div className={styles.stats}><Statistics logType="probation" /></div>
						<PIPProbations
							key="probation"
							modal={modal}
							setModal={setModal}
							logType={activeTab}
							source="manager_dashboard"
						/>
					</TabPanel>
				</Tabs>
			</div>
		</>
	);
}

export default ManagerDashboard;
