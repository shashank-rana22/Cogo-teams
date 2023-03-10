import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Improvement({ loading = false, agentDelay = '' }) {
	return (
		<div className={styles.container}>
			<div className={styles.improvement}>Improvements:</div>
			<div className={styles.box}>
				<div className={styles.improvement_text_box}>
					<div className={styles.dot} />
					<div className={styles.improvement_text}>
						Your chat reply time was
						{' '}
						{loading
							? (
								<Placeholder
									width="40px"
									height="20px"
									className={styles.text_placeholder}
								/>
							)
							: (
								<>
									<span className={styles.value}>
										{(agentDelay || 0) >= 60
											? ((agentDelay || 0) / 60).toFixed(2)
											: (agentDelay || 0)}
									</span>
									{' '}
									<span className={styles.unit}>
										{(agentDelay || 0) >= 60 ? 'hr' : 'min'}
									</span>
								</>
							)}
						{' '}
						slower than your peers
					</div>
				</div>
				<div className={styles.improvement_text_box}>
					<div className={styles.dot} />
					<div className={styles.improvement_text}>Work on reaching out to more customers</div>
				</div>
			</div>
		</div>
	);
}
export default Improvement;
