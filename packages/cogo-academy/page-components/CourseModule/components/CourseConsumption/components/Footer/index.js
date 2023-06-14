import { Button } from '@cogoport/components';

import styles from './styles.module.css';
import useHandleFooter from './useHandleFooter';

function Footer({
	indexes,
	data,
	setIndexes,
	updateCourseProgress,
	loading,
	getUserCourse,
	chapter = {},
	RichTextEditor,
	editorValue,
	setEditorValue,
	setEditorError,
	setChapter,
	setShowTestData,
	setShowFeedback,
}) {
	const { onClickContinueButton, onClickMarkAsComplete, onClickSkipForNow } = useHandleFooter({
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
	});

	if (chapter.user_progress_state === 'completed') {
		return (
			<div className={styles.container}>
				<Button
					type="button"
					size="md"
					themeType="accent"
					loading={loading}
					onClick={onClickContinueButton}
				>
					Continue
				</Button>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<Button
				size="md"
				themeType="secondary"
				loading={loading}
				onClick={onClickSkipForNow}
			>
				Skip For Now
			</Button>

			<Button
				size="md"
				themeType="accent"
				loading={loading}
				onClick={onClickMarkAsComplete}
			>
				Mark As Complete
			</Button>
		</div>
	);
}

export default Footer;
