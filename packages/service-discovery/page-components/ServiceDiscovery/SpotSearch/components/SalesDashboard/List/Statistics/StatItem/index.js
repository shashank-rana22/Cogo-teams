import { cl, Tooltip } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';

import styles from './styles.module.css';

function StatItem({
	text = '',
	count = 0,
	subText = null,
	className = '',
	isActive = false,
	onClick = () => {},
	showCount = true,
	disabled = false,
}) {
	const newClass = `${styles[className] || ''} ${isActive ? styles.active : ''}`;

	return (
		<div
			className={cl`${newClass} ${styles.container} ${disabled && styles.disabled}`}
			onClick={onClick}
			role="presentation"
		>
			{isActive ? <IcMTick fontSize={20} /> : null}

			<div className={cl`${newClass} ${styles.text}`}>
				<Tooltip
					content={text}
					placement="top"
				>
					<div className={styles.label}>{text}</div>
				</Tooltip>
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
