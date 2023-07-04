import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import CreateCourse from '../CreateCourse';
import HomePage from '../CreateModule/components/HomePage';

import Header from './Header';
import QuestionsList from './QuestionsList';

const DEFAULT_INDEX = 0;

const TABS_MAPPING = {
	manage_faq: {
		title                     : 'Manage FAQ',
		component                 : QuestionsList,
		mainApiName               : 'create_question_answer_set',
		permission_navigation_key : 'cogo_academy-create_faq',
	},
	test_module: {
		title                     : 'Test Module',
		component                 : HomePage,
		mainApiName               : 'create_test',
		permission_navigation_key : 'cogo_academy-create_faq',
	},
	course_module: {
		title                     : 'Course Module',
		component                 : CreateCourse,
		mainApiName               : 'create_cogo_academy_course',
		permission_navigation_key : 'cogo_academy-course',
	},
};

const getTabPermissions = ({ permissions_navigations }) => Object.entries(TABS_MAPPING)
	.reduce((acc, [tabKey, item]) => {
		const { permission_navigation_key, mainApiName } = item;

		const navigation = permissions_navigations?.[permission_navigation_key];

		return {
			...acc,
			[tabKey]: {
				tabName   : tabKey,
				isAllowed : navigation?.[mainApiName][DEFAULT_INDEX]?.type !== 'none',
			},
		};
	}, {});

function ControlCenter() {
	const { query, push } = useRouter();
	const { activeTab: currentActiveTab, testModuleTab, courseActiveTab } = query || {};

	const { permissions_navigations = {} } = useSelector((state) => state.profile);

	const tabPermissions = getTabPermissions({ permissions_navigations });
	const tabPermissionsValues = Object.values(tabPermissions);

	const [activeTab, setActiveTab] = useState(() => currentActiveTab
		|| tabPermissionsValues.find((item) => item.isAllowed)?.tabName);

	const isConfigurationAllowed = tabPermissionsValues.every((item) => item.isAllowed);

	const tabPropsMapping = {
		manage_faq    : {},
		test_module   : { testModuleTab },
		course_module : { courseActiveTab },
	};

	const handleChangeTab = (val) => {
		push(`/learning?activeTab=${val}`);

		setActiveTab(val);
	};

	return (
		<div>
			<Header isConfigurationAllowed={isConfigurationAllowed} />

			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={handleChangeTab}
				fullWidth
			>
				{Object.entries(TABS_MAPPING).map(([tabKey, item]) => {
					const { title, component: Component } = item;

					const { isAllowed } = tabPermissions[tabKey];

					if (!isAllowed) return null;

					return (
						<TabPanel
							key={tabKey}
							name={tabKey}
							title={title}
						>
							<Component key={tabKey} {...(tabPropsMapping[tabKey] || {})} />
						</TabPanel>
					);
				})}
			</Tabs>
		</div>
	);
}

export default ControlCenter;
