import { Tabs, TabPanel, Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import styles from './styles.module.css';
import KPIFeedbacks from './TabComponents/KPIFeedbacks';
import PIPProbations from './TabComponents/PIPProbations';
import UploadedFiles from './TabComponents/PIPProbations/UploadedFiles';

function HRDashboard() {
	const router = useRouter();

	const [activeTab, setActiveTab] = useState('feedbacks');
	const [modal, setModal] = useState(''); // for update,logs,create,upload modals

	const routeToFeedbackForms = () => {
		router.push('/performance-management/hr-dashboard/feedback-forms');
	};

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
					<TabPanel name="feedbacks" title="KPI Feedbacks">
						<KPIFeedbacks modal={modal} setModal={setModal} />
					</TabPanel>

					<TabPanel name="pip" title="PIP">
						<PIPProbations key="pip" modal={modal} setModal={setModal} logType={activeTab} />
					</TabPanel>

					<TabPanel name="probation" title="Probation">
						<PIPProbations key="probation" modal={modal} setModal={setModal} logType={activeTab} />
					</TabPanel>

					<TabPanel name="uploaded_files" title="Uploaded Files">
						<UploadedFiles modal={modal} setModal={setModal} />
					</TabPanel>
				</Tabs>
			</div>

		</div>
	);
}

export default HRDashboard;
