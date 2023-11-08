import { Placeholder, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useRef, useState } from 'react';

import styles from './styles.module.css';

const LOOP_SIZE = 2;

function ScrollAnnouncement({ style = {}, loading = false, list = [] }) {
	const ref = useRef(null);

	const [isScrolling, setIsScrolling] = useState(false);

	const handleTap = () => {
		setIsScrolling(!isScrolling);
	};

	if (loading) {
		return (
			<div className={styles.item_container}>
				<Placeholder height={28} />
			</div>
		);
	}

	if (isEmpty(list)) return null;

	return (
		<div className={styles.container} style={style}>
			<div className={styles.icon_div}>
				<Image
					width={20}
					height={20}
					src={GLOBAL_CONSTANTS?.image_url?.public_leaderboard_announcement}
					alt="announcement_icon"
				/>
			</div>

			<div
				className={styles.bar}
				onMouseUp={handleTap}
				onMouseDown={handleTap}
				onMouseLeave={() => { setIsScrolling(false); }}
				role="presentation"
			>

				{[...Array(LOOP_SIZE).keys()].map((loop_item, index) => (
					<span
						key={loop_item}
						ref={index === 0 ? ref : null}
						style={{
							animationDuration: `${(ref?.current?.offsetWidth || 1200) / 80}s`,
						}}
						className={cl`${styles.bar_content} ${isScrolling && styles.bar_content_scrolling}`}
					>
						{(list || []).map((item) => {
							if (ref?.current?.offsetWidth === undefined) return null;
							return (
								<span key={item?.id} className={styles.quest_container}>
									<div dangerouslySetInnerHTML={{ __html: item?.quest_string }} />
								</span>
							);
						})}
					</span>
				))}
			</div>
		</div>
	);
}

export default ScrollAnnouncement;
