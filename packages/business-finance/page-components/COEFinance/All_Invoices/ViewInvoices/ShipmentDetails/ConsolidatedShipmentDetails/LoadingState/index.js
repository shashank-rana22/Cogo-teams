import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const PLACEHOLDERS = [1, 2, 3, 4];

function LoadingState() {
	return (
		<div className={styles.main_container}>
			<div className={styles.container}>
				{PLACEHOLDERS.map((e) => (
					<div key={e} className={styles.flex_row}>
						<div className={styles.percent}>
							<Placeholder />
							<Placeholder />
						</div>
					</div>
				))}
				<div className={styles.button}>
					<Placeholder />
				</div>
			</div>
		</div>
	);
}

export default LoadingState;
