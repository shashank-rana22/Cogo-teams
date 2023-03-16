import { TabPanel, Tabs } from '@cogoport/components';
import { useState } from 'react';

import FeedbackTab from './FeedbackTab';
import RequestTab from './RequestTab';

function PrimaryTabs({ organization_id = '' }) {
	const [activeTab, setActiveTab] = useState('feedbacks');

	return (
		<div style={{ marginTop: 30 }}>
			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={setActiveTab}
			>
				<TabPanel name="feedbacks" title="Feedbacks">
					<FeedbackTab organization_id={organization_id} setActiveTab={setActiveTab} />
				</TabPanel>

				<TabPanel name="requests" title="Requests">
					{/* <RequestTab /> */}
					Requests
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default PrimaryTabs;
