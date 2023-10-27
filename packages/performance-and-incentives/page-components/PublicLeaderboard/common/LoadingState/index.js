import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const LOADING_ARRAY_SIZE = 10;

function LoadingState({ items = 0 }) {
	return (
		<div className={styles.container}>
			{[...Array(items || LOADING_ARRAY_SIZE).keys()].map((item) => (
				<div className={styles.item_container} key={item}>
					<Placeholder height={18} className={styles.item_one} />
					<Placeholder height={18} className={styles.item_two} />
					<Placeholder height={18} className={styles.item_one} />
					<Placeholder height={18} className={styles.item_one} />
				</div>
			))}
		</div>
	);
}

export default LoadingState;
