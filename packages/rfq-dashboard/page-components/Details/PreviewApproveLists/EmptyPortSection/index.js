import React from 'react';

import { EMPTY_PORT } from '../../../../constants';

import styles from './styles.module.css';

function EmptyPortsSection() {
	return (
		<div className={styles.container}>
			<img
				src={EMPTY_PORT}
				alt="empty port"
				className={styles.empty_chat_image}
			/>
		</div>
	);
}

export default EmptyPortsSection;
