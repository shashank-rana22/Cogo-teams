import { TabPanel, Tabs } from '@cogoport/components';
import { useState } from 'react';

function FeedbacksReceived() {
	const [activeTab, setActiveTab] = useState('feedbacks_received');
	return (

		<div style={{ marginTop: 30 }}>
			<Tabs
				activeTab={activeTab}
				themeType="secondary"
				onChange={setActiveTab}
			>
				<TabPanel name="feedbacks_received" title="Account Enrichment Requests" badge={33} />

				<TabPanel name="requests_sent" title="Account Verification" badge={99} />
			</Tabs>
		</div>
	);
}

export default FeedbacksReceived;
