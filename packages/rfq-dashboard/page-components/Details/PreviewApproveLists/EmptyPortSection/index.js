import React from 'react';

import { emptyPortsSection } from '../../../../constants';

import styles from './styles.module.css';

function EmptyPortsSection() {
	return (
		<div className={styles.container}>
			<img
				src={emptyPortsSection}
				alt="-"
				className={styles.empty_chat_image}
			/>
		</div>
	);
}

export default EmptyPortsSection;
