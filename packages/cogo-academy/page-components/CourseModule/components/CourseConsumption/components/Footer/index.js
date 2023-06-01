import { Button } from '@cogoport/components';
import { useSelector } from '@cogoport/store';

import useUpdateUserCourseProgress from '../../hooks/useUpdateUserCourseProgress';
import getChapter from '../../utils/getChapter';

import styles from './styles.module.css';

function Footer({ course_id, indexes, data, setIndexes, getUserCourse, chapterContent = {}, setChapterContent }) {
	const { user:{ id: user_id } } = useSelector((state) => state.profile);

	const {
		courseProgressUpdateLoading : loading,
		updateCourseProgress,
	} = useUpdateUserCourseProgress({ course_id, user_id });

	return (
		<div className={styles.container}>
			<Button size="md" themeType="tertiary">Schedule Time to Begin</Button>

			<div className={styles.btn_container}>

				{chapterContent.user_progress_state === 'completed' ? (
					<Button
						size="md"
						themeType="accent"
						loading={loading}
						onClick={async () => {
							const nextChapterContent = getChapter({
								data,
								indexes,
								state: 'next',
								setIndexes,
								setChapterContent,
							});

							await updateCourseProgress({

								next_chapter_id: nextChapterContent.id,

							});
							getUserCourse();
							setChapterContent(nextChapterContent);
						}}
					>
						Continue
					</Button>
				) : (
					<>
						<Button
							size="md"
							themeType="secondary"
							loading={loading}
							onClick={async () => {
								const nextChapterContent = await getChapter({
									data,
									indexes,
									state: 'next',
									setIndexes,
									setChapterContent,
								});

								const { id, user_progress_state } = nextChapterContent;

								await updateCourseProgress({
									next_chapter_id: id,

									next_chapter_state: user_progress_state === 'introduction' ? 'ongoing'
										: user_progress_state,
								});

								getUserCourse();
								setChapterContent(nextChapterContent);
							}}
						>
							Skip For Now

						</Button>

						<Button
							size="md"
							themeType="accent"
							loading={loading}
							onClick={async () => {
								const { id:current_chapter_id = '' } = chapterContent;

								const nextChapterContent = await getChapter({
									data,
									indexes,
									state: 'next',
									setIndexes,
									setChapterContent,
								});

								const { id, user_progress_state } = nextChapterContent;

								await updateCourseProgress({
									current_chapter_id,
									next_chapter_id    : id,
									next_chapter_state : user_progress_state === 'introduction'
										? 'ongoing' : user_progress_state,
								});

								getUserCourse();
								setChapterContent(nextChapterContent);
							}}
						>
							Mark As Complete

						</Button>
					</>
				)}

			</div>
		</div>
	);
}

export default Footer;
