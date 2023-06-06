import { Button } from '@cogoport/components';
import { IcMArrowLeft, IcMArrowRight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import hideBtn from '../../utils/hideBtn';
import CompletionAndFeedback from '../CompletionAndFeedback';

import AssessmentComponent from './components/AssessmentComponent';
import LoadingState from './LoadingState';
import styles from './styles.module.css';
import useHandleCourseContent from './useHandleCourseContent';

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
	viewType,
	showTestData,
	showFeedback,
	course_id,
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
		formatTime,
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
	});

	if (loading) {
		return <LoadingState />;
	}

	if (showFeedback) {
		return (
			<div className={styles.container}>
				<CompletionAndFeedback
					course_id={course_id}
					feedbackData={data?.course_details?.feedback}
					name={data?.course_details?.name}
				/>
			</div>
		);
	}

	if (showTestData) {
		return (
			<div className={styles.container}>
				<h3>Course Completion Test</h3>

				<div className={styles.instruction}>
					<div className={styles.description_box}>
						<b>
							There is a timed test you need to Pass in order to complete this
							course.
						</b>
						&nbsp; It has been designed specifically to gauge your learnings
						from the course.
					</div>

					<div className={styles.test_details}>
						<div className={styles.data_box}>
							<div className={styles.data_display}>
								<span>No of Questions</span>
								<b>{data?.course_details?.tests[0]?.total_questions || 0}</b>
							</div>

							<div className={styles.data_display}>
								<span>Duration</span>
								<b>
									{formatTime(data?.course_details?.tests[0]?.test_duration)}
								</b>
							</div>

							<div className={styles.data_display}>
								<span>Attempts</span>
								<b>{data?.course_details?.tests[0]?.maximum_attempts}</b>
							</div>

							<div className={styles.data_display}>
								<span>Required Pass %</span>
								<b>{data?.course_details?.tests[0]?.cut_off_percentage}</b>
							</div>
						</div>

						{data?.test_completed ? (
							<Button
								type="button"
								themeType="tertiary"
							>
								Test Completed
							</Button>
						) : (
							<Button
								type="button"
								onClick={onClickVisitTest}
							>
								Visit Test
							</Button>
						)}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.name}>{name}</div>

				{viewType !== 'preview' ? (
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
