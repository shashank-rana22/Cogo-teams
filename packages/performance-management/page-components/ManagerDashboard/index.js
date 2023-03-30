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
		<div>
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
					<TabPanel name="pip_probations" title="PIP / Probations">
						<div className={styles.stats}><Statistics /></div>
						<PIPProbations source="manager_dashboard" modal={modal} setModal={setModal} />
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
}

export default ManagerDashboard;
