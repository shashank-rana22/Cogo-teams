import { useRouter } from '@cogoport/next';

import downloadFileFromUrl from
	'../../../../../CreateCourse/CourseCreation/components/AdvanceCourseCreation/utils/downloadFileFromUrl';
import getChapter from '../../utils/getChapter';

const TIME_UNIT_VALUE = 60;

function FormatTime({ test_duration = 0 }) {
	return (
		<div>
			{Math.floor(test_duration / TIME_UNIT_VALUE)}
		&nbsp;
			<b>Hour</b>
		&nbsp;
			{test_duration % TIME_UNIT_VALUE}
		&nbsp;
			<b>Min</b>
		</div>
	);
}

const useHandleCourseContent = ({
	updateCourseProgress,
	getUserCourse,
	setChapter,
	data,
	indexes,
	setIndexes,
	setEditorError,
	setEditorValue,
	chapter_content,
	TEST_INDEX,
}) => {
	const router = useRouter();

	const handleChange = (value) => {
		setEditorError(false);
		setEditorValue(value);
	};

	const openInNewTab = (url) => {
		window.open(url, '_blank', 'noopener,noreferrer');
	};

	const onClickVisitTest = () => {
		router.push(
			`/learning/tests/${data?.course_details?.tests[TEST_INDEX]?.id}?from=${data?.course_details?.id}`,
		);
	};

	const onClickAttachment = ({ attachment }) => {
		if (attachment.type === 'downloadable_resource') {
			downloadFileFromUrl(attachment.media_url);
			return;
		}

		openInNewTab(attachment.media_url);
	};

	const SOURCE_MAPPING = {
		video: chapter_content.includes('/watch?v=')
			? chapter_content.replace('/watch?v=', '/embed/')
			: '',
		presentation : `https://view.officeapps.live.com/op/embed.aspx?src=${chapter_content}`,
		document     : chapter_content,
	};

	const onClickPreviousChapter = async () => {
		const prevChapterContent = await getChapter({
			data,
			indexes,
			state: 'prev',
			setIndexes,
		}) || {};

		const { id, user_progress_state } = prevChapterContent;

		await updateCourseProgress({
			next_chapter_id: id,
			next_chapter_state:
				user_progress_state === 'introduction'
					? 'ongoing'
					: user_progress_state,
		});

		await getUserCourse();

		setChapter(prevChapterContent);
	};

	const onClickNextChapter = async () => {
		const nextChapter = await getChapter({
			data,
			indexes,
			state: 'next',
			setIndexes,
			setChapter,
		}) || {};

		const { id, user_progress_state } = nextChapter;

		await updateCourseProgress({
			next_chapter_id: id,
			next_chapter_state:
				user_progress_state === 'introduction'
					? 'ongoing'
					: user_progress_state,
		});

		await getUserCourse();

		setChapter(nextChapter);
	};

	return {
		onClickNextChapter,
		onClickPreviousChapter,
		FormatTime,
		handleChange,
		SOURCE_MAPPING,
		onClickVisitTest,
		onClickAttachment,
	};
};

export default useHandleCourseContent;
