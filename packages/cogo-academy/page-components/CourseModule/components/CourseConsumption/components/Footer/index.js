import { Button } from '@cogoport/components';

import getChapter from '../../utils/getChapter';

import styles from './styles.module.css';

function Footer({
	indexes, data, setIndexes, updateCourseProgress, loading,
	getUserCourse, chapter = {}, editorValue, setEditorError, setChapter,
}) {
	return (
		<div className={styles.container}>
			<Button size="md" themeType="tertiary">Schedule Time to Begin</Button>

			<div className={styles.btn_container}>

				{chapter.user_progress_state === 'completed' ? (
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
								setChapter,
							});

							await updateCourseProgress({

								next_chapter_id: nextChapterContent.id,

							});
							getUserCourse();
							setChapter(nextChapterContent);
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
									setChapter,
								});

								const { id, user_progress_state } = nextChapterContent;

								await updateCourseProgress({
									next_chapter_id: id,

									next_chapter_state: user_progress_state === 'introduction' ? 'ongoing'
										: user_progress_state,
								});

								getUserCourse();
								setChapter(nextChapterContent);
							}}
						>
							Skip For Now

						</Button>

						<Button
							size="md"
							themeType="accent"
							loading={loading}
							onClick={async () => {
								const { id:current_chapter_id = '', content_type = '', is_updated = false } = chapter;

								if (content_type === 'assessment'
								&& !editorValue.getEditorState().getCurrentContent().hasText()) {
									setEditorError(true);
									return;
								}

								const nextChapterContent = await getChapter({
									data,
									indexes,
									state: 'next',
									setIndexes,
									setChapter,
								});

								const { id, user_progress_state } = nextChapterContent;

								await updateCourseProgress({
									current_chapter_id,
									next_chapter_id    : id,
									next_chapter_state : user_progress_state === 'introduction'
										? 'ongoing' : user_progress_state,
									...(content_type === 'assessment'
										? { user_submission: editorValue.toString('html') } : {}),
									...(is_updated === true ? { is_updated: false } : {}),
								});

								getUserCourse();
								setChapter(nextChapterContent);
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
