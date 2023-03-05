import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function LoadingState() {
	return (
		<div className={styles.main_container}>
			<div className={styles.container}>
				<div className={styles.flex_row}>
					<div className={styles.percent}>
						<Placeholder />
						<Placeholder />
					</div>
				</div>
				<div className={styles.details}>
					<Placeholder />
				</div>

				<div className={styles.flex_row}>
					<div className={styles.percent}>
						<Placeholder />
						<Placeholder />
					</div>
				</div>
				<div className={styles.flex_row}>
					<div className={styles.percent}>
						<Placeholder />
						<Placeholder />
					</div>
				</div>

				<div className={styles.flex_row}>
					<div className={styles.percent}>
						<Placeholder />
						<Placeholder />
					</div>
				</div>
				<div className={styles.button}>
					<Placeholder />
				</div>
			</div>
		</div>
	);
}

export default LoadingState;
