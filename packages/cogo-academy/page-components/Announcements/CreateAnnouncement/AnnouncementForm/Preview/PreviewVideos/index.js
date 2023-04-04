import { IcMArrowRight, IcMArrowLeft } from '@cogoport/icons-react';
import React, { useRef } from 'react';

import styles from './styles.module.css';

const scrollAmount = 766;

function PreviewVideos({ videos = [] }) {
	const scrollRefVideos = useRef('');

	const scrollHandlerRightVideos = () => {
		scrollRefVideos.current.scrollLeft += scrollAmount;
	};

	const scrollHandlerLeftVideos = () => {
		scrollRefVideos.current.scrollLeft -= scrollAmount;
	};
	return (
		<div>

			{(videos || []).length > 0 && (
				<div className={styles.content_container}>

					<div className={styles.content_header_container}>

						<div className={styles.heading}>VIDEOS</div>

						{videos.length > 2 && (
							<div className={styles.icn_container}>
								<IcMArrowLeft width={25} height={25} onClick={scrollHandlerLeftVideos} />
								<IcMArrowRight width={25} height={25} onClick={scrollHandlerRightVideos} />
							</div>
						)}

					</div>

					<div className={styles.content_inner_container} ref={scrollRefVideos}>

						<div className={styles.contents}>

							{videos.map((video, index) => (
								<div
									key={video}
									className={styles.content_item}
									style={{ marginLeft: `${index === 0 ? '' : '20px'}` }}
								>
									<iframe
										width="366"
										height="206"
										src={video}
										title="Video player"
										frameBorder="0"
										allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share"
										allowfullscreen="true"
									/>

								</div>

							))}

						</div>

					</div>
				</div>
			)}

		</div>
	);
}

export default PreviewVideos;
