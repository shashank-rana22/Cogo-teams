import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import CreateCourse from '../CreateCourse';
import HomePage from '../CreateModule/components/HomePage';

import Header from './Header';
import QuestionsList from './QuestionsList';

const ZERO_INDEX = 0;

const KEYS_MAPPING = ['manage_faq', 'test_module', 'course_module'];

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

const getTabPermission = ({ navigation, apiName, tabName }) => {
	const isAllowed = navigation?.[apiName][ZERO_INDEX]?.type !== 'none';
	return { tabName, isAllowed };
};

function ControlCenter() {
	const { query, push } = useRouter();

	const { permissions_navigations = {} } = useSelector((state) => state.profile);

	const { activeTab: currentActiveTab, testModuleTab, courseActiveTab } = query || {};

	const allTabsPermissionsMappings = [
		{
			navigation : permissions_navigations?.['cogo_academy-create_faq'],
			apiName    : 'create_question_answer_set',
			tabName    : 'manage_faq',
		},
		{
			navigation : permissions_navigations?.['cogo_academy-create_faq'],
			apiName    : 'create_test',
			tabName    : 'test_module',
		},
		{
			navigation : permissions_navigations?.['cogo_academy-course'],
			apiName    : 'create_cogo_academy_course',
			tabName    : 'course_module',
		},
	];

	const tabPermissions = allTabsPermissionsMappings.map((item) => {
		const { navigation, apiName, tabName } = item;

		return getTabPermission(
			{
				navigation,
				apiName,
				tabName,
			},
		);
	});

	const defaultActiveTab = tabPermissions.find((item) => item.isAllowed);

	const [activeTab, setActiveTab] = useState(currentActiveTab || defaultActiveTab.tabName);

	const isConfigurationAllowed = tabPermissions.every((item) => item.isAllowed);

	const tabPropsMapping = {
		manage_faq    : {},
		test_module   : { testModuleTab },
		course_module : { courseActiveTab },
	};

	const COMPONENT_MAPPING = KEYS_MAPPING.map((element, index) => (
		{
			name      : element,
			isAllowed : tabPermissions[index]?.isAllowed,
		}
	));

	const handleChangeTab = (val) => {
		push(`/learning?activeTab=${val}`);

		setActiveTab(val);
	};

	return (
		<div>
			<Header
				isConfigurationAllowed={isConfigurationAllowed}
			/>

			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={handleChangeTab}
				fullWidth
			>
				{COMPONENT_MAPPING.map((item) => {
					const { name, isAllowed } = item;

					const activeComponentProps = tabPropsMapping[name];

					const { title, component: ActiveComponent } = TABS_MAPPING[name];

					if (!isAllowed) {
						return null;
					}

					return (

						<TabPanel
							name={name}
							title={title}
							key={name}
						>
							<ActiveComponent {...activeComponentProps} />
						</TabPanel>

					);
				})}
			</Tabs>
		</div>
	);
}

export default ControlCenter;
