import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import CourseDetailCard from './CourseDetailCard.js';
import styles from './styles.module.css';

function CourseModule() {
	const [activeTab, setActiveTab] = useState('ongoing');

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

	return (
		<div className={styles.container}>
			<h1>My Courses</h1>

			<div style={{ margin: 20 }}>
				<Tabs
					activeTab={activeTab}
					themeType="secondary"
					onChange={setActiveTab}
				>

					{tabs.map(({ name, title }) => (
						<TabPanel name={name} title={title} badge={5}>
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
