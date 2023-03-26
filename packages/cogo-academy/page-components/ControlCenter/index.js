import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import HomePage from '../CreateModule/components/HomePage';

import Analytics from './Analytics';
import Header from './Header';
import QuestionsList from './QuestionsList';

function ControlCenter() {
	const { query } = useRouter();

	const { activeTab: currentActiveTab } = query || {};

	const [activeTab, setActiveTab] = useState(currentActiveTab || 'manage_faq');
	const [switchDashboard, setSwitchDashboard] = useState(true);

	if (!switchDashboard) {
		return <Analytics setSwitchDashboard={setSwitchDashboard} />;
	}

	return (
		<div>
			<Header setSwitchDashboard={setSwitchDashboard} />

			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={setActiveTab}
				fullWidth
			>
				<TabPanel name="manage_faq" title="Manage FAQ">
					<QuestionsList />
				</TabPanel>

				<TabPanel name="test_module" title="Test Module">
					<HomePage />
				</TabPanel>
			</Tabs>

		</div>
	);
}

export default ControlCenter;
