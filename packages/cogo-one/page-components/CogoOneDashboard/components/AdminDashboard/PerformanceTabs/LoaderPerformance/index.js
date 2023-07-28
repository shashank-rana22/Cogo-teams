import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const NO_OF_PLACHOLDER_ROW = 5;

function LoaderPerformance() {
	return (
		<>
			{[...Array(NO_OF_PLACHOLDER_ROW).keys()].map((val) => (
				<div key={val} className={styles.loader_box}>
					<div className={styles.left_loader}>
						<Placeholder
							width="35px"
							height="35px"
							margin="8px 5px"
							className={styles.picture_placeholder}
						/>
						<div className={styles.left_loader_pair}>
							<Placeholder
								width="120px"
								height="10px"
								margin="8px 5px"
								className={styles.performance_placeholder}
							/>
							<Placeholder
								width="45px"
								height="10px"
								margin="2px 5px"
								className={styles.performance_placeholder}
							/>
						</div>
					</div>
					<div>
						<Placeholder
							width="40px"
							height="35px"
							margin="8px 5px"
							className={styles.performance_placeholder}
						/>
					</div>
				</div>
			))}
		</>
	);
}

export default LoaderPerformance;
