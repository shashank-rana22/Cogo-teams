import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const LOADER_LENGTH = 8;

function LoadingState() {
	return (
		<div className={styles.container}>
			{([...Array(LOADER_LENGTH).keys()]).map((itm) => (
				<Placeholder
					key={itm}
					height="20px"
					width="120px"
				/>
			))}
		</div>
	);
}

export default LoadingState;
