import { cl } from '@cogoport/components';
import { IcMAnnouncement } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function ScrollAnnouncement({
	text = `Lorem Ipsum is simply dummy text of the printing and typesetting 
		industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s`,
}) {
	const [isScrolling, setIsScrolling] = useState(false);

	const handleTap = () => {
		setIsScrolling(!isScrolling);
	};

	return (
		<div className={styles.container}>
			<div className={styles.icon_div}>
				<IcMAnnouncement height={20} width={20} />
			</div>
			<div
				className={styles.bar}
				onMouseUp={handleTap}
				onMouseDown={handleTap}
				role="presentation"
			>
				<span className={cl`${styles.bar_content} ${isScrolling && styles.bar_content_scrolling}`}>
					{text}
				</span>
			</div>
		</div>
	);
}

export default ScrollAnnouncement;
