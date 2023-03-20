import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const LoadingState = () => (

	[1, 2, 3].map(() => (
		<div className={styles.card_item}>

			<div className={styles.condition_name}>
				<Placeholder width="200px" height="20px" />
			</div>

			<div className={styles.lower_container}>

				{[1, 2, 3, 4].map(() => (
					<div className={styles.single_control}>
						<Placeholder width="240px" height="20px" style={{ marginBottom: '8px' }} />

						<Placeholder width="80px" height="20px" />
					</div>
				))}
			</div>

		</div>
	))

);

export default LoadingState;
