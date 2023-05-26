import React from 'react';
// import SkeletonUI from '@cogoport/front/components/SkeletonV1';
import VerticleLine from '../TrackingInfo/VerticleLine';
import { Placeholder } from '@cogoport/components';
// import { SingleItem, Main, Heading, Gap } from './styles';
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
					<div classname={styles.Gap}>
						<Placeholder height="22px" />
					</div>
				</div>
			</div>
		);
	});
};

export default LoadingState;
