import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';
import quotes from './utils/quotes';

function Loader({ topic = {} }) {
	const [extract] = useState(quotes[Math.floor(Math.random() * 10)]);

	return (
		<div className={styles.container}>
			<div className={styles.topic_heading}>
				Topic:
				{' '}
				{startCase(topic.display_name) || 'Search Result'}
			</div>

			<div className={styles.loop_wrapper}>
				<div className={styles.mountain} />
				<div className={styles.hill} />
				<div className={styles.tree} />
				<div className={styles.rock} />
				<div className={styles.truck} />
			</div>
			<p className={styles.line}>
				{extract}
			</p>
		</div>
	);
}

export default Loader;
