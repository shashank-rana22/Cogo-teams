import { TabPanel, Tabs } from '@cogoport/components';
import { useState } from 'react';

import Address from './Address';
import PointOfContacts from './PointOfContacts';

function PrimaryTabs({ feedback_request_id = '' }) {
	const [activeTab, setActiveTab] = useState('user');

	return (
		<div style={{ marginTop: 30 }}>
			<Tabs
				activeTab={activeTab}
				themeType="secondary"
				onChange={setActiveTab}
			>

				<TabPanel name="user" title="Point of Contacts">
					<PointOfContacts activeTab={activeTab} feedback_request_id={feedback_request_id} />
				</TabPanel>

				<TabPanel name="address" title="Address">
					<Address activeTab={activeTab} feedback_request_id={feedback_request_id} />
				</TabPanel>

			</Tabs>
		</div>
	);
}

export default PrimaryTabs;
