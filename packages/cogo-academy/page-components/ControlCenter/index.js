import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import CreateCourse from '../CreateCourse';
import HomePage from '../CreateModule/components/HomePage';

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
	course_module: {
		title     : 'Course Module',
		component : CreateCourse,
	},
};

function ControlCenter() {
	const { query, push } = useRouter();

	const { activeTab: currentActiveTab, testModuleTab, courseActiveTab } = query || {};

	const [activeTab, setActiveTab] = useState(currentActiveTab || 'manage_faq');

	const handleChangeTab = (val) => {
		push(`/learning?activeTab=${val}`);

		setActiveTab(val);
	};

	const tabPropsMapping = {
		manage_faq    : {},
		test_module   : { testModuleTab },
		course_module : { courseActiveTab },
	};

	return (
		<div>
			<Header />

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
