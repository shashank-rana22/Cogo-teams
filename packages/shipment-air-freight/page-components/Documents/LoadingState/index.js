import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const LOADER_COUNT = 6;

const LoadingState = () => Array.from(Array(LOADER_COUNT).keys()).map((key) => (
	<div className={styles.single_item} key={key}>

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
