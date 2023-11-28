import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const LOADER_LENGTH = 2;

function LoadingState() {
	return (
		<div className={styles.container}>
			<div className={styles.flex_container}>
				{[...Array(4).keys()].map((key) => (
					<Placeholder key={key} height="40px" width="120px" className={styles.placeholder} />
				))}
			</div>

			<div className={styles.container}>
				{[...Array(LOADER_LENGTH).keys()].map((key) => (
					<Placeholder key={key} height="100px" className={styles.placeholder} />
				))}
			</div>
		</div>
	);
}

export default LoadingState;
