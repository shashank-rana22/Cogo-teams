import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import styles from './styles.module.css';

const ONE_MINUTE = 60;
const MIN_ROUND_UP = 2;

function Improvement({ loading = false, agentDelay = '' }) {
	return (
		<div className={styles.container}>
			<div className={styles.improvement}>Improvements:</div>
			<div className={styles.box}>
				<div className={styles.improvement_text_box}>
					<div className={styles.dot} />
					<div className={styles.improvement_text}>
						Your chat reply time was
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
									<span className={styles.agent_delay}>
										{(agentDelay || GLOBAL_CONSTANTS.zeroth_index) >= ONE_MINUTE
											? ((agentDelay || GLOBAL_CONSTANTS) / ONE_MINUTE).toFixed(MIN_ROUND_UP)
											: (agentDelay || GLOBAL_CONSTANTS)}
									</span>
									<span className={styles.unit}>
										{(agentDelay || GLOBAL_CONSTANTS) >= ONE_MINUTE ? 'hr' : 'min'}
									</span>
								</>
							)}
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
