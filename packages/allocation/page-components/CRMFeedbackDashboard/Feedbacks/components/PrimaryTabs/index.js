import { TabPanel, Tabs } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import FeedbackTab from './FeedbackTab';
import RequestTab from './RequestTab';
import styles from './styles.module.css';

function PrimaryTabs({ organization_id = '', type = '' }) {
	const { t } = useTranslation(['allocation']);

	const [activeTab, setActiveTab] = useState('feedbacks');

	return (
		<div className={styles.tabs_container}>
			<Tabs
				activeTab={activeTab}
				themeType="secondary"
				onChange={setActiveTab}
			>
				<TabPanel name="feedbacks" title={t('allocation:tab_feedback_received_label')}>
					<FeedbackTab organization_id={organization_id} type={type} />
				</TabPanel>

				<TabPanel name="requests" title={t('allocation:tab_requests_label')}>
					<RequestTab organization_id={organization_id} type={type} />
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default PrimaryTabs;
