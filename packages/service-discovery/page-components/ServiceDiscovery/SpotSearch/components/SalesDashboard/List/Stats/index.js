import { IcMTick } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Stats({
	text = '',
	count = 0,
	subText = null,
	className = '',
	isActive = false,
	onClick = () => {},
}) {
	const newClass = `${styles[className] || ''} ${isActive ? styles.active : ''}`;

	return (
		<div className={`${newClass} ${styles.container}`} onClick={onClick} role="presentation">
			{isActive ? <IcMTick fontSize={20} /> : null}

			<div className={`${newClass} ${styles.text}`}>
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
			<div className={`${styles.active} ${styles.margin}`}>{count}</div>

		</div>
	);
}
export default Stats;
