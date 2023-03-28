import { TabPanel, Tabs } from '@cogoport/components';
import { useState } from 'react';

import FeedbacksReceived from './FeedbacksReceived';
import RequestsSent from './RequestsSent';

function PrimaryTabs() {
	const [activeTab, setActiveTab] = useState('feedbacks_received');

	return (
		<div style={{ marginTop: 30 }}>
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
