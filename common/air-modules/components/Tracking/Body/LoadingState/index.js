import { Placeholder } from '@cogoport/components';
import React from 'react';

import VerticleLine from '../TrackingData/VerticleLine';

import styles from './styles.module.css';

const LOADER_COUNT = 4;
const LAST_INDEX_CHECK = -1;

const LoadingState = () => [...Array(LOADER_COUNT).keys()].map((key) => (
	<div className={styles.single_item} key={key}>
		<VerticleLine zIndex={key} isLast={key === LOADER_COUNT + LAST_INDEX_CHECK} />

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
