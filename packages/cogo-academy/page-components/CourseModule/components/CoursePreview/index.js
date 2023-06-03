import { useSelector } from '@cogoport/store';
import { format } from '@cogoport/utils';

import useGetUserCourse from '../../hooks/useGetUserCourse';
import CourseCurriculum from '../CourseIntroduction/components/CourseCurriculum';
import CourseDetails from '../CourseIntroduction/components/CourseDetails';

import styles from './styles.module.css';

function CoursePreview() {
	const {
		general: { query = {} },
		profile:{ user = {} },
	} = useSelector((state) => state);

	const { id: user_id } = user;

	const { course_id = '' } = query;

	const { data, loading } = useGetUserCourse({ course_id, user_id });

	if (loading) {
		return null;
	}

	return (
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
		</div>
	);
}

export default CoursePreview;
