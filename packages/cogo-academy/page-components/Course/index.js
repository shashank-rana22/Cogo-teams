import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import Courses from './components/Courses';
import SearchFilter from './components/SearchFilter';
import Students from './components/Students';
import Header from './Header';
import styles from './styles.module.css';

const TABS_MAPPING = {
	courses: {
		title     : 'Courses',
		component : Courses,
	},
	students: {
		title     : 'Students',
		component : Students,
	},
};

function Course() {
	const { query, push } = useRouter();

	const { activeTab: currentActiveTab, coursesTab } = query || {};

	const [activeTab, setActiveTab] = useState(currentActiveTab || 'courses');

	const handleChangeTab = (val) => {
		push(`/learning/course?activeTab=${val}`);

		setActiveTab(val);
	};

	const tabPropsMapping = {
		courses  : {},
		students : { coursesTab },
	};

	return (
		<div className={styles.container}>
			<Header />
			<div className={styles.tabs_container}>

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
				<SearchFilter />
			</div>
		</div>
	);
}

export default Course;
