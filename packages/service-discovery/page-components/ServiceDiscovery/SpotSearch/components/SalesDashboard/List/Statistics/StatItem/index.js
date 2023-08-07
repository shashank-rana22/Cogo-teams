import { cl } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function StatItem({
	text = '',
	count = 0,
	subText = null,
	className = '',
	isActive = false,
	onClick = () => {},
	showCount = true,
}) {
	const newClass = `${styles[className] || ''} ${isActive ? styles.active : ''}`;

	return (
		<div className={cl`${newClass} ${styles.container}`} onClick={onClick} role="presentation">
			{isActive ? <IcMTick fontSize={20} /> : null}

			<div className={cl`${newClass} ${styles.text}`}>
				{text}
				{' '}
				{subText && (
					<span className={styles.sub}>
						(
						{subText}
						)
					</span>
				)}
			</div>

			{showCount ? (
				<div className={cl`${styles.active} ${styles.margin}`}>{count}</div>
			) : null}
		</div>
	);
}
export default StatItem;
