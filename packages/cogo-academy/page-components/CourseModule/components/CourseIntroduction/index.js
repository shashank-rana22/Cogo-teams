import { useSelector } from '@cogoport/store';
import { format } from '@cogoport/utils';
import { useState } from 'react';

import useGetUserCourse from '../../hooks/useGetUserCourse';
import Header from '../Header';

import CourseCurriculum from './components/CourseCurriculum';
import CourseDetails from './components/CourseDetails';
import { Footer } from './components/Footer';
import SimilarCourses from './components/SimilarCourses';
import styles from './styles.module.css';

function CourseIntroduction() {
	const {
		general: { query = {} },
		profile:{ user = {} },
	} = useSelector((state) => state);

	const { id: user_id } = user;

	const { course_id = '', viewType = '' } = query;

	const [currentCategory, setCurrentCategory] = useState('all_courses');

	const { data, loading } = useGetUserCourse({ course_id, user_id });

	if (loading) {
		return null;
	}

	return (
		<>
			<Header
				currentCategory={currentCategory}
				setCurrentCategory={setCurrentCategory}
			/>

			<div className={styles.container}>
				<CourseDetails
					data={data?.course_details}
					instructorData={data?.instructors}
					module={data?.course_modules}
				/>
				<CourseCurriculum data={data} />

				<div className={styles.date_display}>
					<b>Last Updated:</b>
					&nbsp;
					{format(data?.updated_at, 'dd MMMM yyyy')}
					&nbsp;|&nbsp;
					<b>Created on:</b>
					&nbsp;
					{format(data?.created_at, 'dd MMMM yyyy')}

				</div>

				<SimilarCourses course_details={data?.course_details} />
			</div>

			{viewType !== 'curriculum' ? (
				<div className={styles.bottom}>
					<Footer course_id={course_id} user_id={user_id} data={data} />
				</div>
			) : null}
		</>
	);
}

export default CourseIntroduction;
