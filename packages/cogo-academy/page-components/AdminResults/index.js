import { TabPanel, Tabs } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import QuestionsComponent from './components/QuestionsComponent';
import StudentsComponent from './components/StudentsComponent';
import useGetAdminTestResult from './hooks/useGetAdminTestResult';
import styles from './styles.module.css';

function AdminResults() {
	const {
		general: { query = {} },
	} = useSelector((state) => state);

	const [activeTab, setActiveTab] = useState('students');

	const { test_id = '' } = query || {};

	const {
		// loading,
		data,
		// getAdminTestResult,
		// setFilters,
		// filters,
	} = useGetAdminTestResult({ activeTab, test_id });

	console.log('data', data);

	const componentMapping = {
		tests: {
			key            : 'students',
			title          : 'Students',
			component      : StudentsComponent,
			componentProps : { test_id },
		},
		question_set: {
			key            : 'questions',
			title          : 'Questions',
			component      : QuestionsComponent,
			componentProps : { test_id },
		},
	};

	return (
		<div className={styles.container}>
			<div className={styles.tabs_container}>
				<Tabs
					activeTab={activeTab}
					fullWidth
					themeType="primary"
					onChange={setActiveTab}
					className={styles.tabs}
				>
					{Object.values(componentMapping).map((tab) => {
						const { key, title, component:ContainerComponent = null, componentProps } = tab;

						if (!componentMapping) return null;

						return (
							<TabPanel
								name={key}
								title={title}
								className={styles.tabItem}
							>
								<ContainerComponent {...componentProps} />
							</TabPanel>
						);
					})}
				</Tabs>
			</div>
		</div>
	);
}

export default AdminResults;
