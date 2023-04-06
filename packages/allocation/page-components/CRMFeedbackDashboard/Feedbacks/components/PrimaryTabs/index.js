import { TabPanel, Tabs } from '@cogoport/components';
import { useState } from 'react';

import FeedbackTab from './FeedbackTab';
import RequestTab from './RequestTab';
import styles from './styles.module.css';

function PrimaryTabs({ organization_id = '', type = '' }) {
	const [activeTab, setActiveTab] = useState('feedbacks');

	return (
		<div className={styles.tabs_container}>
			<Tabs
				activeTab={activeTab}
				themeType="secondary"
				onChange={setActiveTab}
			>
				<TabPanel name="feedbacks" title="Feedbacks Received">
					<FeedbackTab organization_id={organization_id} type={type} />
				</TabPanel>

				<TabPanel name="requests" title="Requests">
					<RequestTab organization_id={organization_id} type={type} />
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default PrimaryTabs;
