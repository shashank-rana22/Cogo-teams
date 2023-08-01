import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const ARRAY_LENGTH_FOR_LOADER = 5;
function LoadingState() {
	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<div className={styles.main}>
					<Placeholder height={8} width={60} />
				</div>
				<div>
					<Placeholder height={8} width={60} />
				</div>
			</div>

			{ [...Array(ARRAY_LENGTH_FOR_LOADER).keys()].map((item) => (
				<div key={item?.id}>
					<div className={styles.main}>
						<Placeholder height={8} width={60} />
					</div>
					<div>
						<Placeholder height={8} width={60} />
					</div>
				</div>
			))}

			<div>
				<div className={styles.right}>
					<Placeholder height={8} width={60} />
				</div>
				<div>
					<Placeholder height={8} width={60} />
				</div>
			</div>
		</div>
	);
}

export default LoadingState;
