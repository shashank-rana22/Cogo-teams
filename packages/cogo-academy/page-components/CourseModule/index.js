import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import Header from './components/Header';
import CourseDetailCard from './CourseDetailCard.js';
import useListCourseUserMappings from './hooks/useListCourseUserMappings';
import styles from './styles.module.css';

function CourseModule() {
	const [activeTab, setActiveTab] = useState('ongoing');
	const [filters, setFilters] = useState({});

	const tabs = [{
		name  : 'ongoing',
		title : 'Ongoing',
	}, {
		name  : 'mandatory',
		title : 'Mandatory',
	}, {
		name  : 'completed',
		title : 'Completed',
	}, {
		name  : 'saved',
		title : 'Saved',
	}];

	const { data, loading } = useListCourseUserMappings({ filters, activeTab });

	const { list = [] } = data || {};

	return (
		<div className={styles.container}>
			<Header />

			<div className={styles.main_heading}>My Courses</div>

			<div>
				<Tabs
					activeTab={activeTab}
					themeType="secondary"
					onChange={setActiveTab}
				>

					{tabs.map(({ name, title }) => (
						<TabPanel name={name} title={title}>
							<div>This is suggested</div>
						</TabPanel>
					))}

				</Tabs>
			</div>

			<CourseDetailCard />
		</div>
	);
}

export default CourseModule;
