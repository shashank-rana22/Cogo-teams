import React from 'react';

import styles from './styles.module.css';

function EmptyState({
	showContent = {
		heading     : 'No Results Found!',
		description : 'Looks like you do not have emails for this section',
	},
}) {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>{showContent.heading}</div>
			<div className={styles.content}>{showContent.description}</div>
		</div>
	);
}

export default EmptyState;
