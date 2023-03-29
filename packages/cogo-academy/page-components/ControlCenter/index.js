import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import HomePage from '../CreateModule/components/HomePage';

import Analytics from './Analytics';
import Header from './Header';
import QuestionsList from './QuestionsList';

function ControlCenter() {
	const { query, push } = useRouter();

	const { activeTab: currentActiveTab, testModuleTab } = query || {};

	const [activeTab, setActiveTab] = useState(currentActiveTab || 'manage_faq');
	const [switchDashboard, setSwitchDashboard] = useState(true);

	const handleChangeTab = (val) => {
		push(`/learning?activeTab=${val}`);

		setActiveTab(val);
	};

	if (!switchDashboard) {
		return <Analytics setSwitchDashboard={setSwitchDashboard} />;
	}

	return (
		<div>
			<Header setSwitchDashboard={setSwitchDashboard} activeTab={activeTab} />

			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={handleChangeTab}
				fullWidth
			>
				<TabPanel name="manage_faq" title="Manage FAQ">
					<QuestionsList />
				</TabPanel>

				<TabPanel name="test_module" title="Test Module">
					<HomePage testModuleTab={testModuleTab} />
				</TabPanel>
			</Tabs>

		</div>
	);
}

export default ControlCenter;
