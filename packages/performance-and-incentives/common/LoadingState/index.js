import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const LOADING_ARRAY_SIZE = 10;

function LoadingState() {
	return (
		<div className={styles.container}>
			{[...Array(LOADING_ARRAY_SIZE).keys()].map((item) => (
				<div className={styles.item_container} key={item}>
					<Placeholder height={10} className={styles.item_one} />
					<Placeholder height={10} className={styles.item_two} />
					<Placeholder height={10} className={styles.item_one} />
					<Placeholder height={10} className={styles.item_one} />
				</div>
			))}
		</div>
	);
}

export default LoadingState;
