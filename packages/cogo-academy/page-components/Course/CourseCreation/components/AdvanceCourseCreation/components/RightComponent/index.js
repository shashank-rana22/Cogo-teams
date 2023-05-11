import { useForm } from '@cogoport/forms';

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

function RightComponent({ activeTab, setActiveTab }) {
	const {
		control,
		watch,
		formState: { errors = {} },
		handleSubmit,
		reset,
	} = useForm();

	const ActiveComponent = COMPONENT_MAPPING[activeTab] || Curriculum;

	return (
		<div className={styles.conatiner}>
			<Header activeTab={activeTab} reset={reset} handleSubmit={handleSubmit} setActiveTab={setActiveTab} />

			<ActiveComponent
				errors={errors}
				control={control}
				handleSubmit={handleSubmit}
				watch={watch}
			/>
		</div>
	);
}

export default RightComponent;
