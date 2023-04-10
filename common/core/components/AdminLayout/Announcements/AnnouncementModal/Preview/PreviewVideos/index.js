import { IcMArrowRight, IcMArrowLeft } from '@cogoport/icons-react';
import React, { useRef } from 'react';

import styles from './styles.module.css';

function PreviewVideos({ videos = [], fromFloatingWidget = false }) {
	const scrollAmount = 800;

	const scrollRefVideos = useRef('');

	const scrollHandlerRightVideos = () => {
		scrollRefVideos.current.scrollLeft += scrollAmount;
	};

	const scrollHandlerLeftVideos = () => {
		scrollRefVideos.current.scrollLeft -= scrollAmount;
	};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>VIDEOS</div>

			<div className={styles.content_container}>

				{(videos || []).length > 2 && (
					<div
						role="presentation"
						className={`${styles.arrow_container} ${styles.left}`}
						onClick={() => scrollHandlerLeftVideos()}
					>
						<div className={styles.arrow}><IcMArrowLeft /></div>
					</div>
				)}

				<div className={styles.content_inner_container} ref={scrollRefVideos}>

					{videos.map((video, index) => (
						<div
							key={video}
							className={styles.content_item}
							style={{ marginLeft: `${index === 0 ? '' : '24px'}` }}
						>
							<iframe
										// width="366"
								width={fromFloatingWidget ? '410' : '366'}
								height={fromFloatingWidget ? '230' : '206'}
										// height="206"
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

				{(videos || []).length > 2 && (
					<div
						role="presentation"
						className={`${styles.arrow_container} ${styles.right}`}
						onClick={() => scrollHandlerRightVideos()}
					>
						<div className={styles.arrow}><IcMArrowRight /></div>
					</div>
				)}
			</div>

		</div>
	);
}

export default PreviewVideos;
