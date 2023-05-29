import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function LoadingState() {
	return (
		<div className={styles.main_container}>
			<div className={styles.container}>
				<div className={styles.details}>
					<Placeholder />
				</div>
				{ [1, 2, 3, 4, 5].map((item) => (
					<div className={styles.flex_row} key={item.id}>
						<div className={styles.percent}>
							<Placeholder />
							<Placeholder />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default LoadingState;
