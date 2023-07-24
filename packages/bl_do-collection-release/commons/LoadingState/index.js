import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const LOADING_ARRAY_SIZE = 3;
function LoadingState() {
	return (
		<div className={styles.main_container}>
			<div>
				<Placeholder height={14} width={50} />
			</div>
			<div className={styles.container}>
				<div>
					<div className={styles.first_column}>
						<Placeholder height={14} width={90} />
					</div>
					<div className={styles.first_column}>
						<Placeholder height={14} width={90} />
					</div>
				</div>
				<div>
					<div>
						<div className={styles.loader_style}>
							<Placeholder height={8} width={90} />
						</div>
						<div className={styles.second_column}>
							<Placeholder height={8} width={90} />
						</div>
					</div>
					<div>
						<div className={styles.first_column}>
							<Placeholder height={8} width={90} />
						</div>
						<div className={styles.second_column}>
							<Placeholder height={8} width={90} />
						</div>
					</div>
				</div>
				<div>
					<div>
						<div className={styles.loader_style}>
							<Placeholder height={8} width={120} />
						</div>
						<div className={styles.second_column}>
							<Placeholder height={8} width={170} />
						</div>
					</div>
					<div>
						<div className={styles.first_column}>
							<Placeholder height={8} width={90} />
						</div>
						<div className={styles.second_column}>
							<Placeholder height={8} width={170} />
						</div>
					</div>
				</div>
				<div>
					<div>
						<div className={styles.loader_style}>
							<Placeholder height={8} width={140} />
						</div>
						<div className={styles.second_column}>
							<Placeholder height={8} width={110} />
						</div>
					</div>
					<div>
						<div className={styles.first_column}>
							<Placeholder height={8} width={90} />
						</div>
						<div className={styles.second_column}>
							<Placeholder height={8} width={160} />
						</div>
					</div>
				</div>
				<div>
					<div className={styles.loader_style}>
						<Placeholder height={8} width={140} />
					</div>
					{[...Array(LOADING_ARRAY_SIZE).keys()].map((item) => (
						<div className={styles.second_column} key={item}>
							<Placeholder height={8} width={140} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default LoadingState;
