import { IcMStarfull } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

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
		<>
			<div className={styles.header}>
				<div className={styles.name}>ffrcf</div>
				<IcMStarfull />
			</div>
			<div>
				About the course:
				{' '}
				{courseData.query_name}
			</div>
			<div>
				About the course:
				{' '}
				{courseData.query_name}
			</div>
			<div>
				<div>In this course, you will learn (Objectives)</div>
				{(courseData?.course_objectives || []).map((item) => (
					<div>hws</div>
				))}
			</div>
		</>

	);
}

export default CourseConsumption;
