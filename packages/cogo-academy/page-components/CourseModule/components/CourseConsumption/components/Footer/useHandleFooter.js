import { isEmpty } from '@cogoport/utils';

import getChapter from '../../utils/getChapter';
import isLastChapter from '../../utils/isLastChapter';
import notCompletedChapter from '../../utils/notCompletedChapter';

const onLastChapter = ({
	setShowTestData,
	setChapter,
	setIndexes,
	setShowFeedback = () => {},
	courseData,
}) => {
	const { all_chapters_completed = false, test_mapping = {} } = courseData;

	setChapter({});
	setIndexes({});

	if (all_chapters_completed && !isEmpty(test_mapping || {})) {
		setShowTestData(true);
		return;
	}

	setShowFeedback(true);
};

const useHandleFooter = ({
	setChapter,
	data,
	indexes,
	setIndexes,
	getUserCourse,
	updateCourseProgress,
	setEditorError,
	chapter,
	editorValue,
	RichTextEditor,
	setEditorValue,
	setShowTestData,
	setShowFeedback,
}) => {
	const onClickContinueButton = async () => {
		const checkIsLastChapter = isLastChapter(data, indexes);

		const nextChapterContent = checkIsLastChapter
			? notCompletedChapter(data, indexes, setIndexes)
			: await getChapter({
				data,
				indexes,
				state: 'next',
				setIndexes,
				setChapter,
			});

		await updateCourseProgress({
			next_chapter_id: nextChapterContent.id,
		});

		const res = await getUserCourse();

		const { hasError = false, data: courseData = {} } = res || {};

		const { all_chapters_completed = false } = courseData;

		if (!hasError && checkIsLastChapter && all_chapters_completed) {
			onLastChapter({
				courseData,
				setShowFeedback,
				setShowTestData,
				setChapter,
				setIndexes,
			});
			return;
		}

		setChapter(nextChapterContent);
	};

	const onClickMarkAsComplete = async () => {
		const checkIsLastChapter = isLastChapter(data, indexes);

		const {
			id: current_chapter_id = '',
			content_type,
			is_updated = false,
		} = chapter;

		if (
			content_type === 'assessment'
			&& !editorValue.getEditorState().getCurrentContent().hasText()
		) {
			setEditorError(true);
			return;
		}

		const nextChapterContent = checkIsLastChapter
			? notCompletedChapter(data, indexes, setIndexes)
			: await getChapter({
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
			next_chapter_id: id,
			next_chapter_state:
				user_progress_state === 'introduction'
					? 'ongoing'
					: user_progress_state,
			...(content_type === 'assessment'
				? { user_submission: editorValue.toString('html') }
				: {}),
			...(is_updated === true ? { is_updated: false } : {}),
		});

		const res = await getUserCourse();

		const { hasError = false, data: courseData = {} } = res || {};

		const { all_chapters_completed = false } = courseData;

		if (!hasError && checkIsLastChapter && all_chapters_completed) {
			onLastChapter({
				courseData,
				setShowFeedback,
				setShowTestData,
				setChapter,
				setIndexes,
			});
			return;
		}

		setChapter(nextChapterContent);
	};

	const onClickSkipForNow = async () => {
		const nextChapterContent = isLastChapter(data, indexes)
			? notCompletedChapter(data, indexes, setIndexes)
			: await getChapter({
				data,
				indexes,
				state: 'next',
				setIndexes,
				setChapter,
			});

		const { id, user_progress_state } = nextChapterContent || {};

		await updateCourseProgress({
			next_chapter_id: id,

			next_chapter_state:
				user_progress_state === 'introduction'
					? 'ongoing'
					: user_progress_state,
		});

		await getUserCourse();

		setChapter(nextChapterContent);
	};

	return {
		onClickContinueButton,
		onClickMarkAsComplete,
		onClickSkipForNow,
	};
};

export default useHandleFooter;
