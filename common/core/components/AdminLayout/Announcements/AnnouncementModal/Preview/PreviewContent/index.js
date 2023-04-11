import { IcMArrowRight, IcMArrowLeft } from '@cogoport/icons-react';
import { upperCase } from '@cogoport/utils';
import React, { useRef } from 'react';

import openDocument from '../../../../../../helpers/openDocument';

import styles from './styles.module.css';

function PreviewContent({ data = [], fromFloatingWidget = false, isMobile = false, type = '' }) {
	const scrollRef = useRef('');

	const scrollAmount = isMobile ? 360 : 800;

	const scrollHandlerRight = () => {
		scrollRef.current.scrollLeft += scrollAmount;
	};

	const scrollHandlerLeft = () => {
		scrollRef.current.scrollLeft -= scrollAmount;
	};

	const getWidth = () => {
		if (isMobile) return '330';
		if (fromFloatingWidget) return '410';
		return '366';
	};

	const getHeight = () => {
		if (isMobile) return '186';
		if (fromFloatingWidget) return '230';
		return '206';
	};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>{upperCase(type)}</div>

			<div className={styles.content_container}>

				{(data || []).length > (isMobile ? 1 : 2) && (
					<div
						role="presentation"
						className={`${styles.arrow_container} ${styles.left}`}
						onClick={() => scrollHandlerLeft()}
					>
						<div className={styles.arrow}><IcMArrowLeft /></div>
					</div>
				)}

				<div className={styles.content_inner_container} ref={scrollRef}>

					{data.map((item, index) => (
						<div
							key={item}
							className={styles.content_item}
							style={{ marginLeft: `${index !== 0 && '24px'}` }}
						>
							{type === 'images' ? (
								<img
									role="presentation"
									src={item}
									alt="img"
									width={getWidth()}
									onClick={() => openDocument(item)}
								/>
							) : (
								<iframe
									width={getWidth()}
									height={getHeight()}
									src={item}
									title="YouTube video player"
									frameBorder="0"
									allow="accelerometer; clipboard-write;
										encrypted-media; gyroscope; picture-in-picture; web-share"
									allowfullscreen="true"
								/>
							)}
						</div>

					))}

				</div>

				{(data || []).length > (isMobile ? 1 : 2) && (
					<div
						role="presentation"
						className={`${styles.arrow_container} ${styles.right}`}
						onClick={() => scrollHandlerRight()}
					>
						<div className={styles.arrow}><IcMArrowRight /></div>
					</div>
				)}
			</div>

		</div>
	);
}

export default PreviewContent;
