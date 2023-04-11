import React from 'react';

import PreviewContent from './PreviewContent';
import PreviewFiles from './PreviewFiles';
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
				<PreviewContent
					data={videos}
					fromFloatingWidget={fromFloatingWidget}
					isMobile={isMobile}
					type="videos"
				/>
			)}

			{(images || []).length > 0 && (
				<PreviewContent
					data={images}
					fromFloatingWidget={fromFloatingWidget}
					isMobile={isMobile}
					type="images"
				/>
			)}

			{(files || []).length > 0 && (
				<PreviewFiles files={files} />
			)}

		</div>
	);
}

export default Preview;
