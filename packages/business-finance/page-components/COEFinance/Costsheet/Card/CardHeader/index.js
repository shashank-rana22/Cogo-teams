import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function CardHeader({ header, value, loading }) {
	return (
		<div className={styles.header}>
			<span className={styles.font}>{header}</span>
			<span className={styles.font}>
				Total
				{' '}
				:
				{' '}
				{loading ? <span className={styles.placeholder}><Placeholder /></span> : value}
			</span>
		</div>
	);
}

export default CardHeader;
