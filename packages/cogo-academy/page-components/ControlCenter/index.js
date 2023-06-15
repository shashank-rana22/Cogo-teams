import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import CreateCourse from '../CreateCourse';
import HomePage from '../CreateModule/components/HomePage';

import Header from './Header';
import QuestionsList from './QuestionsList';

const ZERO_INDEX = 0;
const FIRST_INDEX = 1;
const SECOND_INDEX = 2;

const getTabPermission = ({ navigation, apiName, tabName }) => {
	const isAllowed = navigation?.[apiName][ZERO_INDEX]?.type === 'allowed';
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

	const isConfigurationAllowed = tabPermissions[ZERO_INDEX]?.isAllowed
	&& tabPermissions[FIRST_INDEX]?.isAllowed
	&& tabPermissions[SECOND_INDEX]?.isAllowed;

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
				{tabPermissions[ZERO_INDEX]?.isAllowed && (
					<TabPanel name="manage_faq" title="Manage FAQ">
						<QuestionsList />
					</TabPanel>
				)}

				{ tabPermissions[FIRST_INDEX]?.isAllowed && (
					<TabPanel name="test_module" title="Test Module">
						<HomePage testModuleTab={testModuleTab} />
					</TabPanel>
				)}

				{tabPermissions[SECOND_INDEX]?.isAllowed && (
					<TabPanel name="course_module" title="Course Module">
						<CreateCourse courseActiveTab={courseActiveTab} />
					</TabPanel>
				)}

			</Tabs>
		</div>
	);
}

export default ControlCenter;
