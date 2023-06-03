import { Button } from '@cogoport/components';

import getChapter from '../../utils/getChapter';
import isLastChapter from '../../utils/isLastChapter';
import notCompletedChapter from '../../utils/notCompletedChapter';

import styles from './styles.module.css';

function Footer({
	indexes, data, setIndexes, updateCourseProgress, loading,
	getUserCourse, chapter = {}, RichTextEditor, editorValue, setEditorValue, setEditorError, setChapter,
}) {
	return (
		<div className={styles.container}>

			<div className={styles.btn_container}>

				{chapter.user_progress_state === 'completed' ? (
					<Button
						size="md"
						themeType="accent"
						loading={loading}
						onClick={async () => {
							const nextChapterContent = isLastChapter(data, indexes)
								? notCompletedChapter(data, indexes, setIndexes) : await getChapter({
									data,
									indexes,
									state: 'next',
									setIndexes,
									setChapter,
								});

							// const nextChapterContent = getChapter({
							// 	data,
							// 	indexes,
							// 	state: 'next',
							// 	setIndexes,
							// 	setChapter,
							// });

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
								const nextChapterContent = isLastChapter(data, indexes)
									? notCompletedChapter(data, indexes, setIndexes) : await getChapter({
										data,
										indexes,
										state: 'next',
										setIndexes,
										setChapter,
									});

								const { id, user_progress_state } = nextChapterContent || {};

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
								const { id:current_chapter_id = '', content_type, is_updated = false } = chapter;

								if (content_type === 'assessment'
								&& !editorValue.getEditorState().getCurrentContent().hasText()) {
									setEditorError(true);
									return;
								}

								const nextChapterContent = isLastChapter(data, indexes)
									? notCompletedChapter(data, indexes, setIndexes) : await getChapter({
										data,
										indexes,
										state: 'next',
										setIndexes,
										setChapter,
									});

								const { id, user_progress_state } = nextChapterContent || {};

								if (content_type === 'assessment') {
									setEditorValue(RichTextEditor.createEmptyValue());
									setEditorError(false);
								}

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
