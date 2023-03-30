import { IcMArrowRight, IcMArrowLeft } from '@cogoport/icons-react';
import React, { useRef } from 'react';

import styles from '../PreviewVideos/styles.module.css';

const scrollAmount = 766;

function PreviewImages({ images = [] }) {
	const scrollRefImages = useRef('');

	const scrollHandlerRightImages = () => {
		scrollRefImages.current.scrollLeft += scrollAmount;
	};

	const scrollHandlerLeftImages = () => {
		scrollRefImages.current.scrollLeft -= scrollAmount;
	};
	return (
		<div>
			{(images || []).length > 0 && (
				<div className={styles.content_container}>
					<div className={styles.content_header_container}>
						<div className={styles.heading}>IMAGES</div>
						{images.length > 2 && (
							<div className={styles.icn_container}>
								<IcMArrowLeft width={25} height={25} onClick={scrollHandlerLeftImages} />
								<IcMArrowRight width={25} height={25} onClick={scrollHandlerRightImages} />
							</div>
						)}
					</div>

					<div className={styles.content_inner_container} ref={scrollRefImages}>

						<div className={styles.contents}>
							{images.map((i, index) => (
								<div
									key={i}
									className={styles.content_item}
									style={{ marginLeft: `${index === 0 ? '' : '20px'}` }}
								>
									<img src={i} alt="img" width={366} />
								</div>
							))}
						</div>

					</div>
				</div>
			)}
		</div>
	);
}

export default PreviewImages;
