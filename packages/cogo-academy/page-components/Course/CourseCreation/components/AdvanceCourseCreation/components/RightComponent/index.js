import { useRef } from 'react';

import getProps from './COMPONENT_PROPS_MAPPING';
import CourseCompletion from './components/CourseCompletion';
import CourseOverview from './components/CourseOverview';
import Curriculum from './components/Curriculum';
import IntendedLearners from './components/IntendedLearners';
import PublishCourse from './components/PublishCourse';
import Specifications from './components/Specifications';
import Header from './Header';
import styles from './styles.module.css';

const COMPONENT_MAPPING = {
	overview          : CourseOverview,
	specifications    : Specifications,
	intended_learners : IntendedLearners,
	course_curriculum : Curriculum,
	course_completion : CourseCompletion,
	publish_course    : PublishCourse,
};

function RightComponent({ data = {}, activeTab, setActiveTab, id, getCogoAcademyCourse }) {
	const childRef = useRef({});

	const ActiveComponent = COMPONENT_MAPPING[activeTab] || Curriculum;

	return (
		<div className={styles.conatiner}>
			<Header
				activeTab={activeTab}
				childRef={childRef}
				setActiveTab={setActiveTab}
				id={id}
				getCogoAcademyCourse={getCogoAcademyCourse}
			/>

			<ActiveComponent
				data={getProps(data)[activeTab]}
				ref={(r) => {
					childRef.current[activeTab] = r;
				}}
				id={id}
			/>
		</div>
	);
}

export default RightComponent;
