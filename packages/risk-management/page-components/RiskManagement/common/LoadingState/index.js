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
				{ Array(5).fill().map((_, index) => (
					<div className={styles.flex_row} key={index}>
						<div className={styles.percent}>
							<Placeholder />
							<Placeholder />
						</div>
					</div>
				))}
			</div>
			<div className={styles.container}>
				<div className={styles.details}>
					<Placeholder />
				</div>
				<div className={styles.details}>
					<Placeholder />
				</div>
			</div>
		</div>
	);
}

export default LoadingState;
