import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

interface Props {
	header?: string;
	value?: string | number;
	loading?:boolean;
}

function CardHeader({ header, value, loading }:Props) {
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
