import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRouter } from '@cogoport/next';

import useUpdateUserCourseProgress from '../../../CourseConsumption/hooks/useUpdateUserCourseProgress';

import styles from './styles.module.css';

const FIRST_INDEX = 0;

export function Footer({ course_id, user_id, data = {} }) {
	const router = useRouter();

	const { course_details = {}, course_modules = [] } = data;

	const { created_at = '', updated_at = '' } = course_details;

	const {
		courseProgressUpdateLoading : loading,
		updateCourseProgress,
	} = useUpdateUserCourseProgress({ course_id, user_id });

	const onClickBeginCourse = async () => {
		await updateCourseProgress({
			next_chapter_id: course_modules?.[FIRST_INDEX]
				.course_sub_modules?.[FIRST_INDEX].course_sub_module_chapters?.[FIRST_INDEX].id,

			next_chapter_state: 'ongoing',
		});

		router.push(`/learning/course/${course_id}`);
	};

	return (
		<div className={styles.container}>
			<div>
				<b>Last Updated:</b>
					&nbsp;
				{formatDate({
					date       : updated_at,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
					formatType : 'date',
				})}
					&nbsp;|&nbsp;
				<b>Created on:</b>
					&nbsp;
				{formatDate({
					date       : created_at,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
					formatType : 'date',
				})}
			</div>

			<Button
				className={styles.btn}
				themeType="accent"
				size="lg"
				type="button"
				loading={loading}
				onClick={onClickBeginCourse}
			>
				Begin Course
			</Button>
		</div>
	);
}
