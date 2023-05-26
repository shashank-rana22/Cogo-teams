import { IcMStarfull } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import ModuleNavigation from './components/ModuleNavigation';
import useGetCogoAcademyCourse from './hooks/useGetCogoAcademyCourse';
import useGetCourseDetails from './hooks/useGetCourseDetails';
import styles from './styles.module.css';

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

		<ModuleNavigation data={finalData} />
	);
}

export default CourseConsumption;
