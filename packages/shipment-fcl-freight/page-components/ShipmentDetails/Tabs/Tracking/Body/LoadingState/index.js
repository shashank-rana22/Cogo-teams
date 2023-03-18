import React from 'react';
import { Placeholder } from "@cogoport/components";
import VerticleLine from '../TrackingData/VerticleLine';
import styles from './styles.module.css';

const LoadingState = () => {
	return [...Array(4)].map((v, idx) => {
		return (
			<div className={styles.single_item}>
				<VerticleLine zIndex={idx} isLast={idx === 4} />
				<div className={styles.main}>
					<div className={styles.heading}>
					<Placeholder width="120px" height="28px" />
					</div>
					<div className={styles.gap}>
						<Placeholder height="22px" />
					</div>
				</div>
			</div>
		);
	});
};

export default LoadingState;
