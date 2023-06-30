import { Placeholder } from '@cogoport/components';
import React from 'react';
import { v4 as uuid } from 'uuid';

import VerticleLine from '../TrackingData/VerticleLine';

import styles from './styles.module.css';

const PLACEHOLDER_NUMBER = 4;
const LAST_PLACEHOLDER_INDEX = 3;

const LoadingState = () => [...Array(PLACEHOLDER_NUMBER)].map((v, idx) => (
	<div className={styles.single_item} key={uuid()}>
		<VerticleLine zIndex={idx} isLast={idx === LAST_PLACEHOLDER_INDEX} />

		<div className={styles.main}>
			<div className={styles.heading}>
				<Placeholder width="120px" height="28px" />
			</div>

			<div className={styles.gap}>
				<Placeholder height="22px" />
			</div>
		</div>
	</div>
));

export default LoadingState;
