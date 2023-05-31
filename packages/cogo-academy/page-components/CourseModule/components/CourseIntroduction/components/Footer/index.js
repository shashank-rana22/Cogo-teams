import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import useGetCourseDetails from '../../../CourseConsumption/hooks/useGetCourseDetails';
import useUpdateUserCourseProgress from '../../../CourseConsumption/hooks/useUpdateUserCourseProgress';
import getChapter from '../../../CourseConsumption/utils/getChapter';

import styles from './styles.module.css';

export function Footer({ course_id, user_id, data = {} }) {
	const router = useRouter();

	const {
		courseProgressUpdateLoading : loading,
		updateCourseProgress,
	} = useUpdateUserCourseProgress({ course_id, user_id });

	console.log('data:: ', data);

	return (
		<div className={styles.container}>
			<div className={styles.btn_container}>
				<Button
					className={styles.btn}
					themeType="secondary"
				>
					Schedule Time to Begin
				</Button>
				<Button
					className={styles.btn}
					themeType="accent"
					onClick={() => {
						router.push(`/learning/course/${course_id}`);
						updateCourseProgress({
							next_chapter_id: data[0]
								?.course_sub_modules[0]?.course_sub_module_chapters[0].id,

							next_chapter_state: 'ongoing',
						});
					}}
				>
					Begin Course

				</Button>
			</div>
		</div>
	);
}
