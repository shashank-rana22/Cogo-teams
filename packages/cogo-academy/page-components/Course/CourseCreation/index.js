import { Stepper } from '@cogoport/components';
import { useState } from 'react';

import TABS_MAPPING from '../configs/TABS_MAPPING';

import AdvanceCourseCreation from './components/AdvanceCourseCreation';
import CourseName from './components/CourseName';
import CourseTopics from './components/CourseTopics';
import Header from './Header';
import styles from './styles.module.css';

function CourseCreation() {
	const [activeStepper, setActiveStepper] = useState('course_name');
	const [courseData, setCourseData] = useState({ course_name: '', course_topics: [] });

	const COMPONENT_MAPPING = {
		course_name: {
			component : CourseName,
			props     : {
				setActiveStepper,
				setCourseData,
				courseData,
			},
		},
		course_topics: {
			component : CourseTopics,
			props     : {
				setActiveStepper,
				courseData,
				setCourseData,
			},
		},
	};

	const { component: ActiveComponent, props: activeComponentProps } = COMPONENT_MAPPING[activeStepper];

	return (
		<div>
			<Header />
			{/*
			<div className={styles.container}>
				<div className={styles.stepper_container}>
					<Stepper active={activeStepper} setActive={setActiveStepper} items={TABS_MAPPING} arrowed />
				</div>

				<div className={styles.component_container}>
					<ActiveComponent {...activeComponentProps} />
				</div>
			</div> */}

			<AdvanceCourseCreation />
		</div>
	);
}

export default CourseCreation;
