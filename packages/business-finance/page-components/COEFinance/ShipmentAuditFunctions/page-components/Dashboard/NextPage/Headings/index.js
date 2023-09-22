import React from 'react';

import styles from './styles.module.css';

export default function Headings({ heaadingText = '' }) {
	return (
		<div className={styles.headings}>
			{heaadingText}
			<div className={styles.line} />
		</div>
	);
}
