import { Button } from '@cogoport/components';
import { useSelector } from '@cogoport/store';

import useUpdateUserCourseProgress from '../../hooks/useUpdateUserCourseProgress';
import getChapter from '../../utils/getChapter';

import styles from './styles.module.css';

function Footer({ course_id, indexes, data, setIndexes, setChapterContent }) {
	const { user:{ id: user_id } } = useSelector((state) => state.profile);

	const {
		courseProgressUpdateLoading : loading,
		updateCourseProgress,
	} = useUpdateUserCourseProgress({ course_id, user_id });

	return (
		<div className={styles.container}>
			<Button size="md" themeType="tertiary">Schedule Time to Begin</Button>

			<div className={styles.btn_container}>

				<Button size="md" themeType="secondary" loading={loading}>Skip For Now</Button>
				<Button
					size="md"
					themeType="accent"
					loading={loading}
					onClick={() => {
						updateCourseProgress({
							current_chapter_id : getChapter({ data, indexes }).id,
							next_chapter_id    : data[indexes.moduleIndex]
								?.course_sub_modules[indexes.subModuleIndex]
								?.course_sub_module_chapters[indexes.chapterIndex + 1]?.id,
							next_chapter_state: data[indexes.moduleIndex]
								?.course_sub_modules[indexes.subModuleIndex]
								?.course_sub_module_chapters[indexes.chapterIndex + 1]?.state,

						});

						setIndexes((prev) => ({
							...prev,
							chapterIndex: prev.chapterIndex + 1,

						}));

						setChapterContent(getChapter({ data, indexes }));
					}}
				>
					Mark As Complete

				</Button>
			</div>
		</div>
	);
}

export default Footer;
