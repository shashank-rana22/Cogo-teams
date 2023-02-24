/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
import { IcMArrowLeft, IcMArrowRight } from '@cogoport/icons-react';
import React, { useRef } from 'react';

import styles from './styles.module.css';

function Preview({ formValues = {} }) {
	const scrollRefImages = useRef('');
	const scrollRefVideos = useRef('');
	const scrollHandlerRightImages = () => {
		scrollRefImages.current.scrollLeft += 510;
	};
	const scrollHandlerLeftImages = () => {
		scrollRefImages.current.scrollLeft -= 510;
	};
	const scrollHandlerRightVideos = () => {
		scrollRefVideos.current.scrollLeft += 510;
	};
	const scrollHandlerLeftVideos = () => {
		scrollRefVideos.current.scrollLeft -= 510;
		// scrollRefVideos.current.scrollLeft -= 332;
	};
	const openDocument = (url) => {
		let modifiedUrl = `https://${url}`;
		if (url?.includes('http://') || url?.includes('https://')) {
			modifiedUrl = url;
		}

		window.open(modifiedUrl, '_blank');
	};

	// let flag = true;

	// Object.keys(formValues).forEach((key) => {
	// 	if (key === 'videos') {
	// 		formValues.videos.forEach((element) => {
	// 			if (element.video_item) flag = false;
	// 		});
	// 	} else if (formValues.key?.length !== 0 && formValues.key) flag = false;
	// });
	// if (flag) {
	// 	return (
	// 		<div className={styles.nothing}>Nothing To Preview</div>
	// 	);
	// }
	return (
		<div className={styles.container}>

			<div className={styles.title}>{formValues?.title}</div>
			<div className={styles.description}>{formValues?.description}</div>
			<div className={styles.images_video_container}>
				{formValues?.videos?.[0]?.video_item && (
					<div
						className={styles.images_container}
						style={formValues?.images?.length === 1 ? { alignItems: 'center' } : {}}
					>
						<div className={styles.heading}>Videos</div>
						<div className={styles.images_inner_container}>
							{formValues?.images?.length > 1 && (
								<div className={styles.icn_container} onClick={scrollHandlerLeftVideos}>
									{/* <IcMArrowLeft className="animated_arrow" width={25} height={25} /> */}
									<IcMArrowLeft width={25} height={25} />
								</div>
							)}
							<div className={styles.images} ref={scrollRefVideos}>
								{formValues?.images?.map((item) => (
									<div className={styles.image_item}>
										<img src={item} alt="img" />
									</div>
								))}
							</div>
							{formValues?.images?.length > 1 && (
								<div className={styles.icn_container} onClick={scrollHandlerRightVideos}>
									{/* <IcMArrowRight className="animated_arrow" width={25} height={25} /> */}
									<IcMArrowRight width={25} height={25} />
								</div>
							)}
						</div>
					</div>
				)}
				{formValues?.images?.length > 0 && (
					<div
						className={styles.images_container}
						style={formValues?.images?.length === 1 ? { alignItems: 'center' } : {}}
					>
						{/* <div className={styles.heading}>Images</div> */}
						<div className={styles.images_inner_container}>
							{formValues?.images?.length > 1 && (
								<div className={styles.icn_container} onClick={scrollHandlerLeftImages}>
									{/* <IcMArrowLeft className="animated_arrow" width={25} height={25} /> */}
									<IcMArrowLeft width={25} height={25} />
								</div>
							)}
							<div className={styles.images} ref={scrollRefImages}>
								{formValues?.images?.map((item) => (
									<div className={styles.image_item} onClick={() => openDocument(item)}>
										<img src={item} alt="img" />
									</div>
								))}
							</div>
							{formValues?.images?.length > 1 && (
								<div className={styles.icn_container} onClick={scrollHandlerRightImages}>
									{/* <IcMArrowRight className="animated_arrow" width={25} height={25} /> */}
									<IcMArrowRight width={25} height={25} />
								</div>
							)}
						</div>
					</div>
				)}

			</div>
		</div>
	);
}

export default Preview;
