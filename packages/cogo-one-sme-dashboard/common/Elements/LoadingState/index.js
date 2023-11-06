import { cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function LoadingState({ loaderCount = 10 }) {
	return (
		<div className={cl`${styles.loading_container} ${cl.ns('loading_container')}`}>
			{[...Array(loaderCount).keys()].map(
				(idx) =>	(
					<div
						key={idx}
						className={styles.wave_animation}
					/>
				),
			)}
		</div>
	);
}

export default LoadingState;
