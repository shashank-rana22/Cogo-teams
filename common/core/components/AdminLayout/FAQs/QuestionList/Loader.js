import { Placeholder } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

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
				A fact about Logistics industry:
				<br />
				3 of the top 5 ports in the world are in China
			</p>
		</div>
	);
}

export default Loader;
