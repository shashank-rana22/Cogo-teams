import { Placeholder } from '@cogoport/components';
import React from 'react';
import { v4 as uuid } from 'uuid';

import styles from './styles.module.css';

const LoadingState = () => Array(6).fill().map(() => (
	<div className={styles.single_item} key={uuid()}>
		<div className={styles.main}>
			<div className={styles.heading}>
				<Placeholder className={styles.loader} />
			</div>

			<div className={styles.gap}>
				<Placeholder className={styles.loader} />
			</div>
		</div>

		<div className={styles.sub_container}>
			<Placeholder />
		</div>
	</div>
));

export default LoadingState;
