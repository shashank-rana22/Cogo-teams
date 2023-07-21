import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from '../styles.module.css';

const ONE_MINUTE = 60;
const ROUND_UP = 2;

function Header({ callsAnalytics = {}, calls = [], loading = false }) {
	return (
		<div className={styles.time_durations_section}>
			{(calls || []).map((itm) => {
				const { label, key } = itm || {};

				return (
					<div className={styles.time_durations} key={key}>
						{loading
							? <Placeholder height="15px" width="60px" className={styles.placeholder} />
							: (
								<div className={styles.time_durations_header}>
									<span className={styles.time_durations_value}>
										{(callsAnalytics[key] || GLOBAL_CONSTANTS.zeroth_index) >= ONE_MINUTE
											? ((callsAnalytics[key]
													|| GLOBAL_CONSTANTS.zeroth_index) / ONE_MINUTE).toFixed(ROUND_UP)
											: (callsAnalytics[key] || GLOBAL_CONSTANTS.zeroth_index)}
									</span>
									<span>
										{(callsAnalytics[key]
											|| GLOBAL_CONSTANTS.zeroth_index) >= ONE_MINUTE ? 'hr' : 'min'}
									</span>
								</div>
							)}
						<div className={styles.time_durations_text}>{label}</div>
					</div>
				);
			})}
		</div>
	);
}

export default Header;
