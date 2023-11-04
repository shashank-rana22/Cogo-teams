import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMAnnouncement } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';
import useGetQuests from './useGetQuests';

function ScrollAnnouncement() {
	const [isScrolling, setIsScrolling] = useState(false);

	const { loading, list } = useGetQuests();

	const handleTap = () => {
		setIsScrolling(!isScrolling);
	};

	if (loading) return null;

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
									(
									{formatDate({
										date       : start_date,
										dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
										formatType : 'date',
									})}
									-
									{formatDate({
										date       : end_date,
										dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
										formatType : 'date',
									})}
									)
								</span>
								{quest_string}
							</span>
						);
					})}
				</span>
			</div>
		</div>
	);
}

export default ScrollAnnouncement;
