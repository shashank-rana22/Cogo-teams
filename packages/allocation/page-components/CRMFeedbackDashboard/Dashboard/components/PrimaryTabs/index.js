import { TabPanel, Tabs } from '@cogoport/components';
import { useState } from 'react';

import FeedbacksReceived from './FeedbacksReceived';
import RequestsSent from './RequestsSent';
import styles from './styles.module.css';

function PrimaryTabs() {
	const [activeTab, setActiveTab] = useState('feedbacks_received');

	return (
		<div className={styles.tabs_container}>
			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={setActiveTab}
			>
				<TabPanel name="feedbacks_received" title="Feedbacks Received">
					<FeedbacksReceived activeTab={activeTab} setActiveTab={setActiveTab} />
				</TabPanel>

				<TabPanel name="requests_sent" title="Requests Sent">
					<RequestsSent activeTab={activeTab} />
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default PrimaryTabs;
