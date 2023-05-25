import { IcMStarfull } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import useGetCogoAcademyCourse from './hooks/useGetCogoAcademyCourse';
import useGetCourseDetails from './hooks/useGetCourseDetails';
import styles from './styles.module.css';

import ModuleNavigation from './components/ModuleNavigation';

function CourseConsumption() {
	const router = useRouter();

	const course_id = router?.query?.course_id;

	const {
		loading,
		finalData,
	} = useGetCourseDetails({ id: course_id });

	const {
		courseData,
		courseLoading,
	} = useGetCogoAcademyCourse({ id: course_id });

	return (
		<h1>hello this is madhesh</h1>
	);
}

export default CourseConsumption;
