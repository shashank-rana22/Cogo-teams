import React from 'react';
import VerticleLine from '../TrackingInfo/VerticleLine';
import { Placeholder } from '@cogoport/components';
import styles from './styles.module.css';


const LoadingState = () => {
	return [...Array(4)].map((v, idx) => {
		return (
			<div className={styles.SingleItem}>
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
		);
	});
};

export default LoadingState;
