import { TabPanel, Tabs } from '@cogoport/components';
import { useState } from 'react';

import TABS_MAPPING from '../../../../configs/TABS_MAPPING';

import CourseContent from './CourseContent';
import styles from './styles.module.css';

function MyCourses({ user_id, setOngoingCategories, ongoingCategories }) {
	const [activeTab, setActiveTab] = useState('ongoing');

	return (
		<div>
			<div className={styles.main_heading}>My Courses</div>

			<div>
				<Tabs
					activeTab={activeTab}
					themeType="secondary"
					onChange={setActiveTab}
				>
					{TABS_MAPPING.map(({ name, title }) => (
						<TabPanel key={name} name={name} title={title}>
							<div className={styles.carousel_container}>
								<CourseContent
									user_id={user_id}
									activeTab={activeTab}
									ongoingCategories={ongoingCategories}
									setOngoingCategories={setOngoingCategories}
								/>
							</div>
						</TabPanel>
					))}
				</Tabs>
			</div>
		</div>
	);
}

export default MyCourses;
