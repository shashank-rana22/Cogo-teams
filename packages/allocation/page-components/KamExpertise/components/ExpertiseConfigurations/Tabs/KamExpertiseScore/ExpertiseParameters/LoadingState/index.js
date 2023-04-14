import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const LoadingState = () => (

	[1, 2, 3].map(() => (
		<div className={styles.card_item}>

			<Placeholder width="200px" height="20px" />

			<div className={styles.lower_container}>

				{[1, 2, 3, 4].map((item) => (
					<div key={item} className={styles.single_control}>
						<Placeholder width="240px" height="20px" margin="0px 0px 8px 0px" />

						<Placeholder width="80px" height="20px" />
					</div>
				))}
			</div>

		</div>
	))

);

export default LoadingState;
