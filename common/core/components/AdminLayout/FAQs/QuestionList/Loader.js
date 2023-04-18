import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';
import quotes from './utils/quotes';

function Loader({ topic = {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.topic_heading}>
				Topic:
				{' '}
				{startCase(topic.display_name) || 'Search Result'}
			</div>

			<div className={styles.loopWrapper}>
				<div className={styles.mountain} />
				<div className={styles.hill} />
				<div className={styles.tree} />
				<div className={styles.rock} />
				<div className={styles.truck} />
			</div>
			<p className={styles.line}>
				{quotes[Math.floor(Math.random() * 10)]}
			</p>
		</div>
	);
}

export default Loader;
