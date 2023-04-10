import React from 'react';

import PreviewFiles from './PreviewFiles';
import PreviewImages from './PreviewImages';
import PreviewVideos from './PreviewVideos';
import styles from './styles.module.css';

function Preview({
	data = {},
	editorValue = '',
	fromFloatingWidget = false,
	isMobile = false,
}) {
	const { documents, announcement_attachments } = data;

	const { video = [], image = [], pdf = [] } = documents || announcement_attachments || {};

	const videos = video.map((item) => item.document_url);

	const images = image.map((item) => item.document_url);

	const files = pdf.map((item) => item.document_url);

	return (
		<div className={styles.container}>

			<div className={styles.description}>
				<div dangerouslySetInnerHTML={{ __html: editorValue }} />
			</div>

			{(videos || []).length > 0 && (
				<PreviewVideos videos={videos} fromFloatingWidget={fromFloatingWidget} isMobile={isMobile} />
			)}

			{(images || []).length > 0 && (
				<PreviewImages images={images} fromFloatingWidget={fromFloatingWidget} isMobile={isMobile} />
			)}

			{(files || []).length > 0 && (
				<PreviewFiles files={files} />
			)}

		</div>
	);
}

export default Preview;
