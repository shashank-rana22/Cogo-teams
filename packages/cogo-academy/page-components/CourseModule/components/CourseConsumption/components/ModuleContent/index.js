import { Button } from '@cogoport/components';
import { IcMArrowLeft, IcMArrowRight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import hideBtn from '../../utils/hideBtn';
import CompletionAndFeedback from '../CompletionAndFeedback';

import AssessmentComponent from './components/AssessmentComponent';
import TestComponent from './components/TestComponent';
import LoadingState from './LoadingState';
import styles from './styles.module.css';
import useHandleCourseContent from './useHandleCourseContent';

const TEST_INDEX = 0;

function ModuleContent({
	data = {},
	loading,
	updateCourseProgress,
	chapter = {},
	indexes,
	setIndexes,
	getUserCourse,
	setChapter,
	RichTextEditor,
	editorValue,
	setEditorValue,
	editorError,
	setEditorError,
	viewType = 'normal',
	showTestData,
	showFeedback,
	course_id,
	courseState,
}) {
	const {
		name,
		content_type = '',
		chapter_content = '',
		description,
		chapter_attachments,
		user_progress_state: state,
		user_submission = '',
	} = chapter;

	const {
		onClickNextChapter,
		onClickPreviousChapter,
		FormatTime,
		handleChange,
		SOURCE_MAPPING,
		onClickVisitTest,
		onClickAttachment,
	} = useHandleCourseContent({
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
	});

	const { course_details = {}, test_completed = false } = data;

	const { feedback, name: courseName, tests = [] } = course_details;

	if (loading) {
		return <LoadingState />;
	}

	if (showFeedback) {
		return (
			<div className={styles.container}>
				<CompletionAndFeedback
					course_id={course_id}
					feedbackData={feedback}
					name={courseName}
				/>
			</div>
		);
	}

	if (showTestData) {
		return (
			<TestComponent
				tests={tests}
				test_completed={test_completed}
				onClickVisitTest={onClickVisitTest}
				FormatTime={FormatTime}
				viewType={viewType}
			/>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.name}>{name}</div>

				{viewType !== 'preview' && courseState !== 'completed' ? (
					<div className={styles.btn_container}>
						{!hideBtn(data, 'prev', indexes) && (
							<Button
								size="md"
								type="button"
								themeType="tertiary"
								className={styles.btn}
								loading={loading}
								onClick={onClickPreviousChapter}
							>
								<IcMArrowLeft
									width={14}
									height={14}
									className={styles.arrow_left}
								/>
								Previous
							</Button>
						)}

						{!hideBtn(data, 'next', indexes) && (
							<Button
								size="md"
								type="button"
								themeType="tertiary"
								className={`${styles.btn} ${styles.next_btn}`}
								loading={loading}
								onClick={onClickNextChapter}
							>
								Next
								<IcMArrowRight
									width={14}
									height={14}
									className={styles.arrow_right}
								/>
							</Button>
						)}
					</div>
				) : null}
			</div>

			{!isEmpty(description) && (
				<div className={styles.description}>
					<p>{description}</p>
				</div>
			)}

			<div className={styles.content}>
				{content_type === 'assessment' && (
					<AssessmentComponent
						state={state}
						chapter_content={chapter_content}
						user_submission={user_submission}
						editorError={editorError}
						editorValue={editorValue}
						handleChange={handleChange}
						RichTextEditor={RichTextEditor}
					/>
				)}

				{content_type === 'text' ? (
					<div dangerouslySetInnerHTML={{ __html: chapter_content }} />
				) : null}

				{!['assessment', 'text'].includes(content_type) && (
					<iframe
						style={{
							width     : '90%',
							marginTop : '20px',
							height    : content_type === 'document' ? '80vh' : '400px',
							border    : '0',
						}}
						src={SOURCE_MAPPING[content_type]}
						title="video player"
						allowFullScreen
					/>
				)}
			</div>

			{!isEmpty(chapter_attachments) && (
				<div className={styles.additional_resources}>
					<h3>Additional Resources:</h3>

					{chapter_attachments.map((attachment) => (
						<div
							key={attachment.name}
							role="presentation"
							onClick={onClickAttachment}
							className={styles.list_text}
						>
							{attachment.name}
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default ModuleContent;
