import { Placeholder, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';
import useGetQuests from './useGetQuests';

function ScrollAnnouncement({ style = {} }) {
	const [isScrolling, setIsScrolling] = useState(false);

	const { loading, list } = useGetQuests();

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
				role="presentation"
			>

				<span className={cl`${styles.bar_content} ${isScrolling && styles.bar_content_scrolling}`}>
					{(list || []).map((item, ind) => {
						const { name, quest_string, start_date, end_date } = item || {};
						return (
							<span key={item?.id} className={styles.quest_container}>
								<span className={styles.quest_heading}>
									{ind + 1}
									{'. '}
									{name}
									:
								</span>
								<span>
									from
									{' '}
									<span className={styles.date_text}>
										{formatDate({
											date       : start_date,
											dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
											formatType : 'date',
										})}
									</span>
									{' '}
									to
									{' '}
									<span className={styles.date_text}>
										{formatDate({
											date       : end_date,
											dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
											formatType : 'date',
										})}
									</span>

								</span>
								{quest_string}

								<span className={styles.div_end} />
							</span>
						);
					})}
				</span>
			</div>
		</div>
	);
}

export default ScrollAnnouncement;
