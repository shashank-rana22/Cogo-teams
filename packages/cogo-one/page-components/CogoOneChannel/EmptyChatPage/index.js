import React from 'react';

import { emptyChat } from '../../../constants';

import styles from './styles.module.css';

function EmptyChatPage({ displayMessage }) {
	return (
		<div className={styles.container}>
			<img
				src={emptyChat}
				alt="-"
				className={styles.empty_chat_image}
			/>
			<div className={styles.header}>
				Welcome to
				<span className={styles.sub_header}>CogoOne!</span>
			</div>
			<div className={styles.description}>
				You haven&apos;t opened any
				{' '}
				{displayMessage}
				{' '}
				yet, Please select a
				{' '}
				{displayMessage}
			</div>
		</div>
	);
}

export default EmptyChatPage;
