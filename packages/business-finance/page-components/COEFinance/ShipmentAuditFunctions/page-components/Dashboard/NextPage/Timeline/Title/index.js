import React from 'react';

import styles from './styles.module.css';

const ONE = 1;

export default function Title({
	columnIndex = '',
}) {
	return (
		<div className={styles.accordion_title}>
			{columnIndex === ONE ? 'Invoice' : 'Buy'}
		</div>
	);
}
