import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import LoadingState from '../../../../commons/LoadingState';
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
		return <LoadingState rowsCount={6} />;
	}

	return (
		<>
			<Header
				currentCategory={currentCategory}
				setCurrentCategory={setCurrentCategory}
				input_required={false}
			/>

			<div className={styles.container}>
				<CourseDetails
					data={data?.course_details}
					instructorData={data?.instructors}
					module={data?.course_modules}
				/>

				<CourseCurriculum data={data} />

				{viewType !== 'curriculum' ? (
					<Footer course_id={course_id} user_id={user_id} data={data} />
				) : null}

				<SimilarCourses course_details={data?.course_details} />
			</div>
		</>
	);
}

export default CourseIntroduction;
