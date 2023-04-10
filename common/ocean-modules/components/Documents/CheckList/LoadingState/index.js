import { Placeholder } from '@cogoport/components';
import React from 'react';

import VerticleLine from '../VerticleLine';

import styles from './styles.module.css';

const LoadingState = () => [...Array(6)].map((v, idx) => (
	<div className={styles.single_item}>
		<VerticleLine zIndex={idx} isLast={idx === 5} />
		<div className={styles.main}>
			<div className={styles.heading}>
				<Placeholder width="1200px" height="40px" />
			</div>
			<div className={styles.gap}>
				<Placeholder height="50px" />
			</div>
		</div>
		<div style={{ marginTop: '20px', marginLeft: 'auto' }}>
			<Placeholder />
		</div>
	</div>
));

export default LoadingState;
