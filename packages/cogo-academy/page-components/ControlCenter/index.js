import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import HomePage from '../CreateModule/components/HomePage';

import Header from './Header';
import QuestionsList from './QuestionsList';

function ControlCenter() {
	const { query } = useRouter();

	const { activeTab: currentActiveTab } = query || {};

	const [activeTab, setActiveTab] = useState(currentActiveTab || 'manage_faq');

	return (
		<div>
			<Header />

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
