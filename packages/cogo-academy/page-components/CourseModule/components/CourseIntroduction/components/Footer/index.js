import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRouter } from '@cogoport/next';

import useUpdateUserCourseProgress from '../../../CourseConsumption/hooks/useUpdateUserCourseProgress';

import styles from './styles.module.css';

export function Footer({ course_id, user_id, data = {} }) {
	const router = useRouter();

	const { course_details = {} } = data;

	const { created_at = '', updated_at = '' } = course_details;

	console.log('data', data);
	const {
		courseProgressUpdateLoading : loading,
		updateCourseProgress,
	} = useUpdateUserCourseProgress({ course_id, user_id });

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
				themeType="primary"
				size="lg"
				loading={loading}
				onClick={() => {
					router.push(`/learning/course/${course_id}`);
					updateCourseProgress({
						next_chapter_id: data?.course_modules?.[0]
							.course_sub_modules?.[0].course_sub_module_chapters?.[0].id,

						next_chapter_state: 'ongoing',
					});
				}}
			>
				Begin Course
			</Button>
		</div>
	);
}
