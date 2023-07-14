import { Placeholder } from '@cogoport/components';
import React from 'react';

import VerticleLine from '../CheckList/VerticleLine';

import styles from './styles.module.css';

const LoadingState = () => [...Array(6)].map((v, idx) => (
	<div className={styles.single_item}>
		<VerticleLine isLast={idx === 5} />

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
