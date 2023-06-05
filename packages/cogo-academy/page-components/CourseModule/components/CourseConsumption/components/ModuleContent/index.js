import { Button } from '@cogoport/components';
import { IcMArrowLeft, IcMArrowRight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import getChapter from '../../utils/getChapter';
import hideBtn from '../../utils/hideBtn';
import CompletionAndFeedback from '../CompletionAndFeedback';

import LoadingState from './LoadingState';
import styles from './styles.module.css';

function ModuleContent({
	data = {}, loading,
	updateCourseProgress, chapter = {}, indexes,
	setIndexes,
	getUserCourse,
	setChapter,
	RichTextEditor,
	editorValue,
	setEditorValue,
	editorError,
	setEditorError,
	viewType,
	setShowTestData,
	showTestData,
	showFeedback,
	course_id,
}) {
	const {
		name, content_type = '', chapter_content = '',
		description, chapter_attachments, user_progress_state : state,
		user_submission = '',
	} = chapter;

	const router = useRouter();

	if (loading) {
		return <LoadingState />;
	}

	const openInNewTab = (url) => {
		window.open(url, '_blank', 'noopener,noreferrer');
	};

	const downloadFileAtUrl = (url) => {
		fetch(url).then((response) => response.blob()).then((blob) => {
			const blobURL = URL.createObjectURL(new Blob([blob]));
			const fileName = url.split('/').pop();
			const aTag = document.createElement('a');
			aTag.href = blobURL;
			aTag.setAttribute('download', fileName);
			document.body.appendChild(aTag);
			aTag.click();
			aTag.remove();
		});
	};

	const SOURCE_MAPPING = {
		video        : chapter_content.includes('/watch?v=') ? chapter_content.replace('/watch?v=', '/embed/') : '',
		presentation : `https://view.officeapps.live.com/op/embed.aspx?src=${chapter_content}`,
		document     : chapter_content,
	};

	const handleChange = (value) => {
		setEditorError(false);
		setEditorValue(value);
	};

	const formatTime = (time) => (
		<div>
			{Math.floor(time / 60)}
			&nbsp;
			<b>Hour</b>
			&nbsp;
			{(time % 60)}
			&nbsp;
			<b>Min</b>
		</div>
	);

	if (showFeedback) {
		return (
			<div className={styles.container}>
				<CompletionAndFeedback course_id={course_id} feedbackData={data?.course_details?.feedback} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{ showTestData ? (
				<div>
					<h3>Course Completion Test</h3>

					<div className={styles.instruction}>
						<div className={styles.description_box}>
							<b>There is a timed test you need to Pass in order to complete this course.</b>
							&nbsp;
							It has been designed specifically to gauge your learnings from the course.
						</div>

						<div className={styles.test_details}>
							<div className={styles.data_box}>
								<div className={styles.data_display}>
									<span>No of Questions</span>
									<b>{data?.course_details?.tests[0]?.total_questions || 0}</b>
								</div>

								<div className={styles.data_display}>
									<span>Duration</span>
									<b>{formatTime(data?.course_details?.tests[0]?.test_duration)}</b>

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
							{ data?.test_completed
								? <Button themeType="tertiary">Test Completed</Button>
								: (
									<Button
										onClick={() => { router.push(`/learning/tests/${data?.course_details?.tests[0]?.id}?from=${data?.course_details?.id}`); }}
									>
										Visit Test

									</Button>
								)}
						</div>
					</div>
				</div>
			)
				:			(
					<>
						<div className={styles.header}>

							<div className={styles.name}>
								{name}
							</div>

							{viewType !== 'preview' ? (
								<div className={styles.btn_container}>
									{ !hideBtn(data, 'prev', indexes) && (
										<Button
											size="md"
											themeType="tertiary"
											className={styles.btn}
											loading={loading}
											onClick={async () => {
												const prevChapterContent = await getChapter({
													data,
													indexes,
													state: 'prev',
													setIndexes,
												}) || {};

												const { id, user_progress_state } = prevChapterContent;

												await updateCourseProgress({
													next_chapter_id    : id,
													next_chapter_state : user_progress_state
								=== 'introduction' ? 'ongoing' : user_progress_state,

												});

												await getUserCourse();
												setChapter(prevChapterContent);
											}}
										>
											<IcMArrowLeft width={14} height={14} className={styles.arrow_left} />
											Previous
										</Button>
									)}

									{!hideBtn(data, 'next', indexes) && (
										<Button
											size="md"
											themeType="tertiary"
											className={`${styles.btn} ${styles.next_btn}`}
											loading={loading}
											onClick={async () => {
												const nextChapter = await getChapter({
													data,
													indexes,
													state: 'next',
													setIndexes,
													setChapter,
												}) || {};

												const { id, user_progress_state } = nextChapter;

												await updateCourseProgress({
													next_chapter_id    : id,
													next_chapter_state : user_progress_state === 'introduction'
														? 'ongoing' : user_progress_state,

												});

												await getUserCourse();

												setChapter(nextChapter);
											}}
										>
											Next
											<IcMArrowRight width={14} height={14} className={styles.arrow_right} />
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

							{content_type === 'assessment' && (state === 'completed'
								? <div dangerouslySetInnerHTML={{ __html: user_submission }} /> : (
									<div className={styles.rte}>
										<RichTextEditor
											value={editorValue}
											onChange={handleChange}
											required
											id="body-text"
											name="bodyText"
											type="string"
											multiline
											variant="filled"
											className={styles.text_editor}
											rootStyle={{
												minWidth  : '80%',
												minHeight : '300px',
											}}
										/>

										{editorError && (
											<span className={styles.errors}>
												Answer is required
											</span>
										)}
									</div>
								))}

							{content_type === 'text' && <div dangerouslySetInnerHTML={{ __html: chapter_content }} />}

							{content_type !== 'assessment' && content_type !== 'text' && (
								<iframe
									style={{
										width     : '90%',
										marginTop : '20px',
										height:
							content_type === 'document' ? '80vh' : '400px',
										border: '0',
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
										onClick={() => (attachment.type === 'downloadable_resource'
											? downloadFileAtUrl(attachment.media_url) : openInNewTab(attachment.media_url))}
										className={styles.list_text}
									>
										{attachment.name}
									</div>
								))}
							</div>
						)}
					</>
				)}

		</div>
	);
}

export default ModuleContent;
