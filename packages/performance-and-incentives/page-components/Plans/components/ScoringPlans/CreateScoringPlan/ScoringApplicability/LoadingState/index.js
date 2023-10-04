import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const ARRAY_SIZE = 5;

function LoadingState() {
	return (
		<div className={styles.container}>
			{[...Array(ARRAY_SIZE).keys()].map((subItem) => (
				<div className={styles.inner_container} key={subItem}>
					<Placeholder height={18} />
				</div>
			))}
		</div>
	);
}

export default LoadingState;
