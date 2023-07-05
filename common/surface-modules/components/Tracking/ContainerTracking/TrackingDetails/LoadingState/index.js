import { Placeholder } from '@cogoport/components';
import React from 'react';

import VerticleLine from '../TrackingInfo/VerticleLine';

import styles from './styles.module.css';

const keys = Array(4).fill(null).map(() => Math.random());

const LoadingState = () => [...Array(4)].map((v, idx) => (

	<div className={styles.SingleItem} key={keys[idx]}>

		<VerticleLine zIndex={idx} isLast={idx === 4} />

		<div className={styles.Main}>
			<div className={styles.Heading}>
				<Placeholder width="120px" height="28px" />
			</div>
			<div className={styles.Gap}>
				<Placeholder height="22px" />
			</div>
		</div>
	</div>
));

export default LoadingState;
