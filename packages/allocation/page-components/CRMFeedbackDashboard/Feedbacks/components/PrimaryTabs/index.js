import { TabPanel, Tabs } from '@cogoport/components';
import { useState } from 'react';

import FeedbackTab from './FeedbackTab';
import RequestTab from './RequestTab';

function PrimaryTabs({ organization_id = '' }) {
	const [activeTab, setActiveTab] = useState('feedbacks');
	const [tabCount, setTabCount] = useState([33, 6, 14]);

	const requestCount = `${tabCount[1] || 'NaN'}/${tabCount[2] || 'NaN'}`;

	return (
		<div style={{ marginTop: 30 }}>
			<Tabs
				activeTab={activeTab}
				themeType="secondary"
				onChange={setActiveTab}
			>
				<TabPanel name="feedbacks" title="Feedbacks Received" badge={tabCount[0] || 'NaN'}>
					<FeedbackTab organization_id={organization_id} setActiveTab={setActiveTab} />
				</TabPanel>

				<TabPanel name="requests" title="Requests" badge={requestCount}>
					<RequestTab organization_id={organization_id} setActiveTab={setActiveTab} />
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default PrimaryTabs;
