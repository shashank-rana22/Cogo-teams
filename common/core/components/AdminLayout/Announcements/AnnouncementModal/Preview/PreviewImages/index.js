import { IcMArrowRight, IcMArrowLeft } from '@cogoport/icons-react';
import React, { useRef } from 'react';

import openDocument from '../../../../../../helpers/openDocument';
import styles from '../PreviewVideos/styles.module.css';

const scrollAmount = 800;

function PreviewImages({ images = [], fromFloatingWidget = false }) {
	const scrollRefImages = useRef('');

	const scrollHandlerRightImages = () => {
		scrollRefImages.current.scrollLeft += scrollAmount;
	};

	const scrollHandlerLeftImages = () => {
		scrollRefImages.current.scrollLeft -= scrollAmount;
	};
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Images</div>

			<div className={styles.content_container}>

				{(images || []).length > 2 && (
					<div
						role="presentation"
						className={`${styles.arrow_container} ${styles.left}`}
						onClick={() => scrollHandlerLeftImages()}
					>
						<div className={styles.arrow}><IcMArrowLeft /></div>
					</div>
				)}

				<div className={styles.content_inner_container} ref={scrollRefImages}>

					{(images || []).map((img_item, index) => (
						<div
							key={img_item}
							className={styles.content_item}
							style={{ marginLeft: `${index === 0 ? '' : '24px'}` }}
						>
							<img
								role="presentation"
								src={img_item}
								alt="img"
								// width={366}
								width={fromFloatingWidget ? 410 : 366}
								onClick={() => openDocument(img_item)}
							/>

						</div>

					))}

				</div>

				{(images || []).length > 2 && (
					<div
						role="presentation"
						className={`${styles.arrow_container} ${styles.right}`}
						onClick={() => scrollHandlerRightImages()}
					>
						<div className={styles.arrow}><IcMArrowRight /></div>
					</div>
				)}
			</div>

		</div>
	);
}

export default PreviewImages;
