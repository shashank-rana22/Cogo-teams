import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import Spinner from '../../../../../commons/Spinner';

import PreviewContent from './PreviewContent';
import PreviewFiles from './PreviewFiles';
import styles from './styles.module.css';

function Preview({
	formValues = {},
	announcement_id = '',
	previewLoading = false,
	editorValue = '',
	isMobile = false,
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

			{!isEmpty(videos) && (
				<PreviewContent
					data={videos}
					isMobile={isMobile}
					type="videos"
				/>
			)}

			{!isEmpty(videos) && (
				<PreviewContent
					data={images}
					isMobile={isMobile}
					type="images"
				/>
			)}

			{!isEmpty(videos) && (
				<PreviewFiles files={files} />
			)}

		</div>
	);
}

export default Preview;
