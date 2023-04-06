import React, { useState, useEffect } from 'react';

import Spinner from '../../../../../commons/Spinner';

import PreviewFiles from './PreviewFiles';
import PreviewImages from './PreviewImages';
import PreviewVideos from './PreviewVideos';
import styles from './styles.module.css';

function Preview({
	formValues = {},
	announcement_id = '',
	previewLoading = false,
	editorValue = '',
}) {
	const [videos, setVideos] = useState([]);
	const [files, setFiles] = useState([]);
	const [images, setImages] = useState([]);

	useEffect(() => {
		if (announcement_id) {
			const { announcement_attachments = {} } = formValues;
			const { image = [], pdf = [], video = [] } = announcement_attachments;

			setImages(image.map((item) => item.document_url));
			setVideos(video.map((item) => item.document_url));
			setFiles(pdf.map((item) => item.document_url));
		} else {
			setVideos(formValues?.videos?.filter((item) => item.video_item)?.map((item) => item.video_item));
			setFiles(formValues?.files);
			setImages(formValues?.images);
		}
	}, [announcement_id, formValues]);

	if (previewLoading) {
		return (
			<div className={styles.spinner}>
				<Spinner width="90px" height="90px" />
			</div>
		);
	}

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
