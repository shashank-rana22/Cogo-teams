/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
import { IcMArrowLeft, IcMArrowRight, IcMDocument } from '@cogoport/icons-react';
import React, { useRef, useState, useEffect } from 'react';

import styles from './styles.module.css';

function Preview({ formValues = {}, announcement_id = '' }) {
	const [videos, setVideos] = useState([]);
	const [files, setFiles] = useState([]);
	const [images, setImages] = useState([]);
	const scrollRefImages = useRef('');
	const scrollRefVideos = useRef('');
	const scrollHandlerRightImages = () => {
		scrollRefImages.current.scrollLeft += 341;
	};
	const scrollHandlerLeftImages = () => {
		scrollRefImages.current.scrollLeft -= 341;
	};
	const scrollHandlerRightVideos = () => {
		scrollRefVideos.current.scrollLeft += 341;
	};
	const scrollHandlerLeftVideos = () => {
		scrollRefVideos.current.scrollLeft -= 341;
		// scrollRefVideos.current.scrollLeft -= 332;
	};
	const openDocument = (url) => {
		let modifiedUrl = `https://${url}`;
		if (url?.includes('http://') || url?.includes('https://')) {
			modifiedUrl = url;
		}

		window.open(modifiedUrl, '_blank');
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

	// https://www.youtube.com/embed/R8_veQiYBjI
	// https://www.youtube.com/embed/VnvRFRk_51k

	// const videos = formValues?.videos?.filter((item) => item.video_item).map((item) => item.video_item);
	// const { files, images } = formValues;
	return (
		<div className={styles.container}>

			<div className={styles.title}>{formValues?.title}</div>
			<div className={styles.description}>{formValues?.content}</div>
			<div className={styles.images_video_container}>
				{videos?.length > 0 && (
					<div
						className={styles.videos_container}
						style={videos?.length === 1 ? { alignItems: 'center' } : {}}
					>
						<div className={styles.videos_inner_container}>
							{videos?.length > 1 && (
								<div className={styles.icn_container} onClick={scrollHandlerLeftVideos}>
									<IcMArrowLeft width={25} height={25} />
								</div>
							)}
							<div className={styles.videos} ref={scrollRefVideos}>
								{videos?.map((video) => (
									<div className={styles.video_item}>
										<iframe
											width="333"
											height="210"
											src={video}
											title="YouTube video player"
											frameBorder="0"
											allow="accelerometer; autoplay;
                                        clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
											allowfullscreen
										/>

									</div>
								))}
							</div>
							{videos?.length > 1 && (
								<div className={styles.icn_container} onClick={scrollHandlerRightVideos}>
									<IcMArrowRight width={25} height={25} />
								</div>
							)}
						</div>
					</div>
				)}
				{images?.length > 0 && (
					<div
						className={styles.images_container}
						style={images?.length === 1 ? { alignItems: 'center' } : {}}
					>
						<div className={styles.images_inner_container}>
							{images?.length > 1 && (
								<div className={styles.icn_container} onClick={scrollHandlerLeftImages}>
									<IcMArrowLeft width={25} height={25} />
								</div>
							)}
							<div className={styles.images} ref={scrollRefImages}>
								{images?.map((image) => (
									<div className={styles.image_item} onClick={() => openDocument(image)}>
										<img src={image} alt="img" />
									</div>
								))}
							</div>
							{images?.length > 1 && (
								<div className={styles.icn_container} onClick={scrollHandlerRightImages}>
									<IcMArrowRight width={25} height={25} />
								</div>
							)}
						</div>
					</div>
				)}
			</div>
			{files?.length > 0 && (
				<div className={styles.files_container}>
					<div className={styles.file_heading}>Files Attached:</div>
					<div className={styles.files}>
						{files?.map((file, index) => (
							<div className={styles.file_item}>
								<IcMDocument onClick={() => openDocument(file)} className={styles.doc_icon} />
								<div style={{ fontSize: '10px', marginLeft: '4px' }}>
									Doc
									{'  '}
									{index + 1}
								</div>
								{/* <object data={file} height="20%" width="20%">
								<a href={file}>Document</a>
							</object> */}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default Preview;
