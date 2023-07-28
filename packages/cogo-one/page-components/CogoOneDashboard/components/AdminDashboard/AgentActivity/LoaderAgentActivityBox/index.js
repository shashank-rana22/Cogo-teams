import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const NO_OF_PLACHOLDER_ROW = 2;

function LoaderAgentActivity() {
	return (
		<div className={styles.main_box}>
			{[...Array(NO_OF_PLACHOLDER_ROW).keys()].map((val) => (
				<div key={val} className={styles.loader_box}>
					<Placeholder
						width="270px"
						height="55px"
						className={styles.profile_box}
					/>
					<Placeholder
						width="270px"
						height="55px"
						className={styles.profile_box}
					/>
					<Placeholder
						width="270px"
						height="55px"
						className={styles.profile_box}
					/>
				</div>
			))}
		</div>
	);
}

export default LoaderAgentActivity;
