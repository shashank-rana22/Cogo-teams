import { Button } from '@cogoport/components';
import { IcMArrowLeft, IcMArrowRight } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../CreateCourse/commons/EmptyState';
import getChapter from '../../utils/getChapter';

import LoadingState from './LoadingState';
import styles from './styles.module.css';

function ModuleContent({
	data = {}, loading, courseProgressUpdateLoading,
	updateCourseProgress, chapter = {}, indexes,
	setIndexes,
	getUserCourse,
	setChapter,
}) {
	const { name, content_type = '', chapter_content = '', description, chapter_attachments } = chapter;

	if (loading || courseProgressUpdateLoading) {
		return <LoadingState />;
	}

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

	const SOURCE_MAPPING = {
		video        : chapter_content.replace('/watch?v=', '/embed/'),
		presentation : `https://view.officeapps.live.com/op/embed.aspx?src=${chapter_content}`,
		document     : chapter_content,
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
						loading={courseProgressUpdateLoading || loading}
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

					<Button
						size="md"
						themeType="tertiary"
						className={`${styles.btn} ${styles.next_btn}`}
						loading={courseProgressUpdateLoading || loading}
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
				</div>
			</div>

			<div className={styles.content}>
				{content_type === 'text' ? <div dangerouslySetInnerHTML={{ __html: chapter_content }} />
					: (
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

			{!isEmpty(description) && (
				<div className={styles.description}>
					<h3>Description:</h3>
					<p>{description}</p>
				</div>
			)}

			{!isEmpty(chapter_attachments) && (
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
