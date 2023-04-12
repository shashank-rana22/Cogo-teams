import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function LoadingState() {
	return (
		<div className={styles.loader}>
			{[1, 2, 3, 4, 5, 6, 7].map(() => (
				<Placeholder height="20px" width="200px" margin="32px 0px 0px 0px" />
			))}
		</div>
	);
}

export default LoadingState;
