import { Button } from '@cogoport/components';
import { useSelector } from '@cogoport/store';

import useUpdateUserCourseProgress from '../../hooks/useUpdateUserCourseProgress';
import getChapter from '../../utils/getChapter';

import styles from './styles.module.css';

function Footer({ course_id, indexes, data, setIndexes, getUserCourse, setChapterContent }) {
	const { user:{ id: user_id } } = useSelector((state) => state.profile);

	const {
		courseProgressUpdateLoading : loading,
		updateCourseProgress,
	} = useUpdateUserCourseProgress({ course_id, user_id });

	return (
		<div className={styles.container}>
			<Button size="md" themeType="tertiary">Schedule Time to Begin</Button>

			<div className={styles.btn_container}>

				<Button
					size="md"
					themeType="secondary"
					loading={loading}
					onClick={() => {
						updateCourseProgress({
							next_chapter_id    : getChapter({ data, indexes, which: 'next', setIndexes })?.id,
							next_chapter_state : 'completed',

						});

						// setIndexes((prev) => ({
						// 	...prev,
						// 	chapterIndex: prev.chapterIndex + 1,

						// }));

						setChapterContent(getChapter({ data, indexes, setIndexes }));

						getUserCourse();
					}}
				>
					Skip For Now

				</Button>
				<Button
					size="md"
					themeType="accent"
					loading={loading}
					onClick={() => {
						updateCourseProgress({
							current_chapter_id : getChapter({ data, indexes, which: 'curr', setIndexes }).id,
							next_chapter_id    : getChapter({ data, indexes, which: 'next', setIndexes })?.id,
							next_chapter_state : 'completed',

						});

						// setIndexes((prev) => ({
						// 	...prev,
						// 	chapterIndex: prev.chapterIndex + 1,

						// }));

						setChapterContent(getChapter({ data, indexes, setIndexes }));

						getUserCourse();
					}}
				>
					Mark As Complete

				</Button>
			</div>
		</div>
	);
}

export default Footer;
