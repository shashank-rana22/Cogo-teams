import { Button } from '@cogoport/components';
import { IcMArrowLeft, IcMArrowRight } from '@cogoport/icons-react';
import React, { useRef, useState, useEffect } from 'react';

import Spinner from '../../../../../commons/Spinner';

import styles from './styles.module.css';

const openDocument = (url) => {
	let modifiedUrl = `https://${url}`;
	if (url?.includes('http://') || url?.includes('https://')) {
		modifiedUrl = url;
	}

	window.open(modifiedUrl, '_blank');
};

const scrollAmount = 766;

const truncateString = (str, num) => {
	if (str.length > num) {
		return `${str.substring(0, num)}/.../${str.substring(str.length - num)}`;
	}
	return str;
};

function Preview({ formValues = {}, announcement_id = '', previewLoading = false }) {
	const [videos, setVideos] = useState([]);

	const [files, setFiles] = useState([]);

	const [images, setImages] = useState([]);

	const scrollRefImages = useRef('');
	const scrollRefVideos = useRef('');

	const scrollHandlerRightImages = () => {
		scrollRefImages.current.scrollLeft += scrollAmount;
	};

	const scrollHandlerLeftImages = () => {
		scrollRefImages.current.scrollLeft -= scrollAmount;
	};

	const scrollHandlerRightVideos = () => {
		scrollRefVideos.current.scrollLeft += scrollAmount;
	};

	const scrollHandlerLeftVideos = () => {
		scrollRefVideos.current.scrollLeft -= scrollAmount;
	};

	useEffect(() => {
		if (announcement_id) {
			const { announcement_attachments } = formValues;
			const { image, pdf, video } = announcement_attachments;

			setImages(image?.map((item) => item.document_url));
			setVideos(video?.map((item) => item.document_url));
			setFiles(pdf?.map((item) => item.document_url));
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

	const { content } = formValues;

	return (
		<div className={styles.container}>

			<div className={styles.description}>{content}</div>

			{videos?.length > 0 && (
				<div className={styles.content_container}>
					<div className={styles.content_header_container}>
						<div className={styles.heading}>VIDEOS</div>
						{videos?.length > 2 && (
							<div className={styles.icn_container}>
								<IcMArrowLeft width={25} height={25} onClick={scrollHandlerLeftVideos} />
								<IcMArrowRight width={25} height={25} onClick={scrollHandlerRightVideos} />
							</div>
						)}
					</div>

					<div className={styles.content_inner_container} ref={scrollRefVideos}>

						<div className={styles.contents}>
							{videos?.map((video) => (
								<div key={video} className={styles.content_item}>
									<iframe
										width="366"
										height="200"
										src={video}
										title="YouTube video player"
										frameBorder="0"
										allow="accelerometer; clipboard-write;
										encrypted-media; gyroscope; picture-in-picture; web-share"
										allowfullscreen
									/>

								</div>
							))}
						</div>

					</div>
				</div>
			)}

			{images?.length > 0 && (
				<div className={styles.content_container}>
					<div className={styles.content_header_container}>
						<div className={styles.heading}>IMAGES</div>
						{images?.length > 2 && (
							<div className={styles.icn_container}>
								<IcMArrowLeft width={25} height={25} onClick={scrollHandlerLeftImages} />
								<IcMArrowRight width={25} height={25} onClick={scrollHandlerRightImages} />
							</div>
						)}
					</div>

					<div className={styles.content_inner_container} ref={scrollRefImages}>

						<div className={styles.contents}>
							{images?.map((i) => (
								<div key={i} className={styles.content_item}>
									<img src={i} alt="img" width={366} />
								</div>
							))}
						</div>

					</div>
				</div>
			)}

			{files?.length > 0 && (
				<div className={styles.files_container}>
					<div className={styles.heading}>RELATED ATTACHMENTS</div>

					<div className={styles.files}>
						{files?.map((file) => (
							<Button
								size="md"
								themeType="linkUi"
								onClick={() => openDocument(file)}
								style={{ textAlign: 'start' }}
							>
								{truncateString(file, 30)}

							</Button>

						))}
					</div>

				</div>
			)}

		</div>
	);
}

export default Preview;
