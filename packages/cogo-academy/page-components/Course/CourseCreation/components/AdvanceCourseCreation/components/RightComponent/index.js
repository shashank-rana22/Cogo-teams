import { useRef } from 'react';

import getProps from './COMPONENT_PROPS_MAPPING';
import CourseCompletion from './components/CourseCompletion';
import CourseCurriculum from './components/CourseCurriculum';
import CourseOverview from './components/CourseOverview';
import IntendedLearners from './components/IntendedLearners';
import PublishCourse from './components/PublishCourse';
import Specifications from './components/Specifications';
import Header from './Header';
import styles from './styles.module.css';

const COMPONENT_MAPPING = {
	overview      : CourseOverview,
	specification : Specifications,
	audience      : IntendedLearners,
	curriculum    : CourseCurriculum,
	completion    : CourseCompletion,
	publish       : PublishCourse,
};

function RightComponent({ data = {}, activeTab, id, getCogoAcademyCourse, setActiveTab }) {
	const childRef = useRef({});

	const ActiveComponent = COMPONENT_MAPPING[activeTab] || CourseCurriculum;

	return (
		<div className={styles.conatiner}>
			<Header
				activeTab={activeTab}
				childRef={childRef}
				id={id}
				getCogoAcademyCourse={getCogoAcademyCourse}
				data={data}
				setActiveTab={setActiveTab}
			/>

			<ActiveComponent
				data={getProps(data)[activeTab]}
				ref={(r) => {
					childRef.current[activeTab] = r;
				}}
				id={id}
				activeTab={activeTab}
			/>
		</div>
	);
}

export default RightComponent;
