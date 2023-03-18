import { Placeholder } from '@cogoport/components';
import React from 'react';

import VerticleLine from '../VerticleLine';

import styles from './styles.module.css';

const LoadingState = () => [...Array(4)].map((v, idx) => (
	<div className={styles.single_item}>
		<VerticleLine zIndex={idx} isLast={idx === 3} />
		<div className={styles.main}>
			<div className={styles.heading}>
				<Placeholder width="120px" height="32px" />
			</div>
			<div className={styles.gap}>
				<Placeholder height="40px" />
			</div>
		</div>
		<div style={{ marginTop: '20px', marginLeft: 'auto' }}>
			<Placeholder />
		</div>
	</div>
));

export default LoadingState;
