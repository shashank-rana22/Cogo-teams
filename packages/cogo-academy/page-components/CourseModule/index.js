import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import LoadingState from '../../commons/LoadingState';

import CourseCard from './components/CourseCard';
import Header from './components/Header';
import BUTTON_CONTENT__MAPPING from './configs/BUTTON_CONTENT_MAPPING';
import TABS_MAPPING from './configs/TABS_MAPPING';
import useListCourseUserMappings from './hooks/useListCourseUserMappings';
import styles from './styles.module.css';

function CourseModule() {
	const [activeTab, setActiveTab] = useState('ongoing');

	const { data, loading } = useListCourseUserMappings({ activeTab });

	const { list = [] } = data || {};

	if (loading) {
		return <LoadingState rowsCount={7} />;
	}

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
					{TABS_MAPPING.map(({ name, title }) => (
						<TabPanel key={name} name={name} title={title}>
							{list.map((item) => (
								<CourseCard
									key={item.id}
									data={item}
									buttonContent={BUTTON_CONTENT__MAPPING[activeTab]}
								/>
							))}
						</TabPanel>
					))}

				</Tabs>
			</div>
		</div>
	);
}

export default CourseModule;
