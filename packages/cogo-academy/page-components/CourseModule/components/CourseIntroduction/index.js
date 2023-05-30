import { useSelector } from '@cogoport/store';
import { format } from '@cogoport/utils';
import React from 'react';

import useGetUserCourse from '../../hooks/useGetUserCourse';
import useGetUserCourseDetails from '../../hooks/useGetUserCourseDetails';

import CourseCurriculum from './components/CourseCurriculum';
import CourseDetails from './components/CourseDetails';
import { Footer } from './components/Footer';
import SimilarCourses from './components/SimilarCourses';
import styles from './styles.module.css';

function CourseIntroduction() {
	const {
		general: { query = {} },
	} = useSelector((state) => state);

	const { course_id = '' } = query;

	const { data, loading } = useGetUserCourse({ course_id });
	const { dataDetails, DetailsLoading } = useGetUserCourseDetails({ course_id });

	// console.log('data', data);
	// console.log('dataDetails', dataDetails);

	return (
		<>
			<div className={styles.container}>
				<CourseDetails data={data} />
				<CourseCurriculum data={dataDetails} />

				<div className={styles.date_display}>
					<b>Last Updated:</b>
					&nbsp;
					{format(data?.updated_at, 'dd MMMM yyyy')}
					&nbsp;|&nbsp;
					<b>Created on:</b>
					&nbsp;
					{format(data?.created_at, 'dd MMMM yyyy')}

				</div>

				<SimilarCourses />
			</div>
			<div className={styles.bottom}>
				<Footer course_id={course_id} />
			</div>
		</>
	);
}

export default CourseIntroduction;
