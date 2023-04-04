import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import HomePage from '../CreateModule/components/HomePage';

import Analytics from './Analytics';
import Header from './Header';
import QuestionsList from './QuestionsList';

const TABS_MAPPING = {
	manage_faq: {
		title     : 'Manage FAQ',
		component : QuestionsList,
	},
	test_module: {
		title     : 'Test Module',
		component : HomePage,
	},
};

function ControlCenter() {
	const { query, push } = useRouter();

	const { activeTab: currentActiveTab, testModuleTab } = query || {};

	const [activeTab, setActiveTab] = useState(currentActiveTab || 'manage_faq');
	const [switchDashboard, setSwitchDashboard] = useState(true);

	const handleChangeTab = (val) => {
		push(`/learning?activeTab=${val}`);

		setActiveTab(val);
	};

	const tabPropsMapping = {
		manage_faq  : {},
		test_module : { testModuleTab },
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
				{Object.keys(TABS_MAPPING).map((item) => {
					const activeComponentProps = tabPropsMapping[item];
					const { title, component: ActiveComponent } = TABS_MAPPING[item];

					return (
						<TabPanel key={item} name={item} title={title}>
							<ActiveComponent {...activeComponentProps} />
						</TabPanel>
					);
				})}
			</Tabs>
		</div>
	);
}

export default ControlCenter;
