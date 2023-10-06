import React from 'react';

import styles from './styles.module.css';

export default function Headings({ headingText = '' }) {
	return (
		<div className={styles.headings}>
			{headingText}
			<div className={styles.line} />
		</div>
	);
}
