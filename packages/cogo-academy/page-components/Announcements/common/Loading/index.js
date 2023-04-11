import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function LoadingState({ loadingCount = 0, height = '100px', itemHeight = '0px' }) {
	return (
		<div className={styles.loading_container}>

			{Array.from(Array(loadingCount)).map(() => (
				<div className={styles.loading_item} style={{ height: `${height}` }}>
					<Placeholder height={itemHeight} width="16%" />
					<Placeholder height={itemHeight} width="16%" />
					<Placeholder height={itemHeight} width="16%" />
					<Placeholder height={itemHeight} width="16%" />
					<Placeholder height={itemHeight} width="16%" />
				</div>
			))}

		</div>
	);
}

export default LoadingState;
