import { Button } from '@cogoport/components';
import { IcMArrowLeft, IcMArrowRight } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../CreateCourse/commons/EmptyState';
import useUpdateUserCourseProgress from '../../hooks/useUpdateUserCourseProgress';
import getChapter from '../../utils/getChapter';

import styles from './styles.module.css';

function ModuleContent({
	data = {}, chapterData = {}, indexes,
	course_id,
	user_id,
	setIndexes,
	getUserCourse,
	setChapterContent,
}) {
	const { name, content_type, chapter_content, description, chapter_attachments } = chapterData;

	const {
		courseProgressUpdateLoading : loading,
		updateCourseProgress,
	} = useUpdateUserCourseProgress({ course_id, user_id });

	if (isEmpty(data)) {
		return <EmptyState />;
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

	return (
		<div className={styles.container}>

			<div className={styles.header}>

				<div>
					{startCase(content_type)}
					:
					{' '}
					<span className={styles.name}>{name}</span>

				</div>

				<div className={styles.btn_container}>

					<Button
						size="md"
						themeType="tertiary"
						className={styles.btn}
						loading={loading}
						onClick={() => {
							const { id, state } = getChapter({
								data,
								indexes,
								state: 'prev',
								setIndexes,
								setChapterContent,
							}) || {};

							updateCourseProgress({
								next_chapter_id    : id,
								next_chapter_state : state === 'introduction' ? 'ongoing' : state,

							});

							setChapterContent(getChapter({ data, indexes }));

							getUserCourse();
						}}
					>
						<IcMArrowLeft width={14} height={14} className={styles.arrow_left} />
						Previous
					</Button>

					<Button
						size="md"
						themeType="tertiary"
						className={`${styles.btn} ${styles.next_btn}`}
						loading={loading}
						onClick={() => {
							const { id, user_progress_state } = getChapter({
								data,
								indexes,
								state: 'next',
								setIndexes,
								setChapterContent,
							}) || {};

							updateCourseProgress({
								next_chapter_id    : id,
								next_chapter_state : user_progress_state === 'introduction'
									? 'ongoing' : user_progress_state,

							});

							getUserCourse();
						}}
					>
						Next
						<IcMArrowRight width={14} height={14} className={styles.arrow_right} />
					</Button>
				</div>
			</div>

			<div className={styles.content}>
				{content_type === 'text' ? <div dangerouslySetInnerHTML={{ __html: chapter_content }} />
					: (
						<iframe
							style={{ width: '90%', marginTop: '20px', border: '0' }}
							height="400"
							src={
				    content_type === 'video' ? chapter_content.replace('/watch?v=', '/embed/') : chapter_content
				}
							title="video player"
							allowFullScreen
						/>
						// <iframe
						// 	src={`https://view.officeapps.live.com/op/embed.aspx?src=${chapter_content}`}
						// 	width="100%"
						// 	height="600px"
						// 	title="video player"
						// 	frameBorder="0"
						// />
					)}
			</div>

			{description && (
				<div className={styles.description}>
					<h3>Description:</h3>
					<p>{description}</p>
				</div>
			)}

			{chapter_attachments && (
				<div className={styles.additional_resources}>

					<h3>Additional Resources:</h3>

					{chapter_attachments.map((attachment) => (
						<div
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

		</div>
	);
}

export default ModuleContent;
