import { cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function LoadingState({
	loaderCount = 10,
	customClassName = 'loading_container',
}) {
	return (
		<div className={cl`${styles.loading_container} ${cl.ns(customClassName)}`}>
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
