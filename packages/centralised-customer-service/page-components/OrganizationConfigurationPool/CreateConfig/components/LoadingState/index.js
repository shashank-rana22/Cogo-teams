import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const LOADING_ARRAY_SIZE = 3;

function LoadingState() {
	return (
		<div className={styles.item_container}>
			{[...Array(LOADING_ARRAY_SIZE).keys()].map((subItem) => (
				<div className={styles.inner_container} key={subItem}>
					<Placeholder height={30} className={styles.item} />
					<Placeholder height={30} className={styles.item} />
					<Placeholder height={30} className={styles.item} />
				</div>
			))}
		</div>
	);
}

export default LoadingState;
