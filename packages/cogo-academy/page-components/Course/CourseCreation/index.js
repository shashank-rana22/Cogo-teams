import { Breadcrumb, Stepper } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import TABS_MAPPING from '../configs/TABS_MAPPING';

import CourseName from './CourseName';
import CourseTopics from './CourseTopics';
import styles from './styles.module.css';

function CourseCreation() {
	const { push } = useRouter();

	const [activeStepper, setActiveStepper] = useState('course_name');

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
		<div>
			<div className={styles.top_container}>
				<Breadcrumb>
					<Breadcrumb.Item label={<a href="page number">CogoAcademy</a>} />
					<Breadcrumb.Item label="Course" />
					<Breadcrumb.Item label="Course Creation" />
				</Breadcrumb>

				<div className={styles.header}>
					<IcMArrowBack
						className={styles.back_icon}
						width={20}
						height={20}
						onClick={onClickBackIcon}
					/>

					<div role="presentation" className={styles.title}>Create your Own Course</div>
				</div>
			</div>

			<div className={styles.container}>
				<div className={styles.stepper_container}>
					<Stepper active={activeStepper} setActive={setActiveStepper} items={TABS_MAPPING} arrowed />
				</div>

				<div className={styles.component_container}>
					<ActiveComponent {...activeComponentProps} />
				</div>
			</div>
		</div>
	);
}

export default CourseCreation;
