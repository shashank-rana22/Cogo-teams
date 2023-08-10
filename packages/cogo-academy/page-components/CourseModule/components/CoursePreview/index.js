import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import LoadingState from '../../commons/LoadingState';
import CourseConsumption from '../CourseConsumption';
import CourseCurriculum from '../CourseIntroduction/components/CourseCurriculum';
import CourseDetails from '../CourseIntroduction/components/CourseDetails';

import styles from './styles.module.css';
import useGetCogoAcademyCourse from './useGetCogoAcademyCourse';

function CoursePreview() {
	const {
		general: { query = {} },
	} = useSelector((state) => state);

	const { course_id = '' } = query;

	const [showCourse, setShowCourse] = useState(false);

	const { data, loading, trigger } = useGetCogoAcademyCourse({ id: course_id });

	if (loading) {
		return <LoadingState rowsCount={7} />;
	}

	if (showCourse) {
		return (
			<CourseConsumption
				viewType="preview"
				data={data}
				loading={loading}
				getUserCourse={trigger}
				setShowCourse={setShowCourse}
			/>
		);
	}

	return (
		<div className={styles.container}>
			<CourseDetails
				data={data}
				instructorData={data?.instructors}
				viewType="preview"
			/>
			<CourseCurriculum data={data} />

			<div className={styles.date_display}>
				<b>Last Updated:</b>
					&nbsp;
				{formatDate({
					date       : data?.updated_at,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
					formatType : 'date',
				})}
					&nbsp;|&nbsp;

				<b>Created on:</b>
					&nbsp;
				{formatDate({
					date       : data?.created_at,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
					formatType : 'date',
				})}

				<Button
					type="button"
					size="md"
					style={{ marginLeft: '80px' }}
					onClick={() => setShowCourse(true)}
				>
					Show course
				</Button>
			</div>
		</div>
	);
}

export default CoursePreview;
