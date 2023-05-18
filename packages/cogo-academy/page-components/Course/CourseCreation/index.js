import { Stepper } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import TABS_MAPPING from '../configs/TABS_MAPPING';

import AdvanceCourseCreation from './components/AdvanceCourseCreation';
import CourseCategories from './components/CourseCategories';
import CourseName from './components/CourseName';
import Header from './components/Header';
import styles from './styles.module.css';

function CourseCreation() {
	const { query } = useRouter();

	const { id } = query || {};

	const [activeStepper, setActiveStepper] = useState('course_name');
	const [courseData, setCourseData] = useState({
		course_name       : '',
		course_categories : [],
	});

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
			component : CourseCategories,
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

			{id ? (
				<AdvanceCourseCreation id={id} />
			) : (
				<div className={styles.container}>
					<div className={styles.stepper_container}>
						<Stepper
							active={activeStepper}
							setActive={setActiveStepper}
							items={TABS_MAPPING}
							arrowed
						/>
					</div>

					<div className={styles.component_container}>
						<ActiveComponent {...activeComponentProps} />
					</div>
				</div>
			)}
		</div>
	);
}

export default CourseCreation;
