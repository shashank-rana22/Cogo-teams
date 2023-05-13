import { useRef, useEffect, useState } from 'react';

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

function RightComponent({ data = {}, activeTab, setActiveTab, id }) {
	const ActiveComponent = COMPONENT_MAPPING[activeTab] || Curriculum;

	const childRef = useRef({});

	const [currRef, setCurrRef] = useState(childRef?.current[activeTab]);

	// const obj = () => childRef?.current[activeTab]?.handleSubmit;

	// console.log('obj', obj);

	useEffect(() => {
		setCurrRef(childRef?.current[activeTab]);
	}, [activeTab, childRef]);

	return (
		<div className={styles.conatiner}>
			<Header
				activeTab={activeTab}
				handleSubmit={currRef?.handleSubmit}
				setActiveTab={setActiveTab}
				id={id}
			/>

			<ActiveComponent
				data={getProps(data)[activeTab]}
				ref={(r) => {
					childRef.current[activeTab] = r;
				}}
			/>
		</div>
	);
}

export default RightComponent;
