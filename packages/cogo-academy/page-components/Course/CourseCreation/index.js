import { Stepper } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import TABS_MAPPING from '../configs/TABS_MAPPING';

import CourseName from './CourseName';
import CourseTopics from './CourseTopics';
import styles from './styles.module.css';

function CourseCreation() {
	const [activeStepper, setActiveStepper] = useState('course_name');
	const { push } = useRouter();

	const items = TABS_MAPPING;

	const COMPONENT_MAPPING = {
		course_name: {
			component : CourseName,
			props     : {
				setActiveStepper,
			},
		},
		course_topics: {
			component : CourseTopics,
			props     : {
				setActiveStepper,
			},
		},
	};

	const { component: ActiveComponent, props: activeComponentProps } = COMPONENT_MAPPING[activeStepper];

	const onClickBackIcon = () => {
		push(
			'/learning/course',
			'/learning/course',
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.back_div} role="presentation" onClick={onClickBackIcon}>
				<IcMArrowBack width={20} height={20} />

				<div className={styles.back}>Create your Own Course</div>
			</div>
			<div className={styles.header}>
				<IcMArrowBack
					className={styles.back_icon}
					width={20}
					height={20}
					onClick={onClickBackIcon}
				/>

				<div role="presentation" className={styles.title}>Create your Own Course</div>
			</div>
			<div>
				<Stepper active={activeStepper} setActive={setActiveStepper} items={items} arrowed />
			</div>
			<div>
				<ActiveComponent {...activeComponentProps} />
			</div>
		</div>
	);
}

export default CourseCreation;
