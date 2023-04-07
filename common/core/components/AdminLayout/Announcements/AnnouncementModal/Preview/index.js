import React from 'react';

import PreviewFiles from './PreviewFiles';
import PreviewImages from './PreviewImages';
import PreviewVideos from './PreviewVideos';
import styles from './styles.module.css';

function Preview({
	data = {},
	editorValue = '',
}) {
	const { documents = {} } = data;

	const { video = [], image = [], pdf = [] } = documents;

	const videos = video.map((item) => item.document_url);

	const images = image.map((item) => item.document_url);

	const files = pdf.map((item) => item.document_url);

	return (
		<div className={styles.container}>

			<div className={styles.description}>
				<div dangerouslySetInnerHTML={{ __html: editorValue }} />
			</div>
			<PreviewVideos videos={videos} />
			<PreviewImages images={images} />
			<PreviewFiles files={files} />

		</div>
	);
}

export default Preview;
