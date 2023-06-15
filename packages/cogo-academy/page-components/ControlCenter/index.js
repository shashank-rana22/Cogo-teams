import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import CreateCourse from '../CreateCourse';
import HomePage from '../CreateModule/components/HomePage';

import Header from './Header';
import QuestionsList from './QuestionsList';

const ZERO_INDEX = 0;

const getTabPermission = ({ navigation, apiName }) => navigation?.[apiName][ZERO_INDEX]?.type === 'allowed';

function ControlCenter() {
	const { profile:{ permissions_navigations } } = useSelector((state) => state);

	const { query, push } = useRouter();

	const { activeTab: currentActiveTab, testModuleTab, courseActiveTab } = query || {};

	const [activeTab, setActiveTab] = useState(currentActiveTab || 'manage_faq');

	const isTestModuleTabAllowed = getTabPermission(
		{
			navigation : permissions_navigations?.['cogo_academy-create_faq'],
			apiName    : 'create_test',
		},
	);

	const isManagFaqTabAllowed = getTabPermission(
		{
			navigation : permissions_navigations?.['cogo_academy-create_faq'],
			apiName    : 'create_question_answer_set',
		},
	);

	const isCourseModuleTabAllowed = getTabPermission(
		{
			navigation : permissions_navigations?.['cogo_academy-course'],
			apiName    : 'create_cogo_academy_course',
		},
	);

	const isConfigurationAllowed = isTestModuleTabAllowed && isManagFaqTabAllowed && isCourseModuleTabAllowed;

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
				{isManagFaqTabAllowed && (
					<TabPanel name="manage_faq" title="Manage FAQ">
						<QuestionsList />
					</TabPanel>
				)}

				{ isTestModuleTabAllowed && (
					<TabPanel name="test_module" title="Test Module">
						<HomePage testModuleTab={testModuleTab} />
					</TabPanel>
				)}

				{isCourseModuleTabAllowed && (
					<TabPanel name="course_module" title="Course Module">
						<CreateCourse courseActiveTab={courseActiveTab} />
					</TabPanel>
				)}

			</Tabs>
		</div>
	);
}

export default ControlCenter;
