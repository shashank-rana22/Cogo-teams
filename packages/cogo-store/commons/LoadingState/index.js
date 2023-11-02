import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function LoadingState() {
	return (
		<div>
			<Placeholder
				// height="100px"
				// width="300px"
				// margin="0px 0px 20px 0px"
				className={styles.list_card}
			/>

		</div>
	);
}

export default LoadingState;
