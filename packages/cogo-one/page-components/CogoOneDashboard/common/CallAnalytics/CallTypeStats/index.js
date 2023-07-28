import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from '../styles.module.css';

function CallTypeStats({ channel = [], loading = false, formatData = {} }) {
	return (
		<div className={styles.socoal_icons_and_data_list}>
			{(channel || []).map((stat) => {
				const { key, icon, call_type, static_data } = stat || {};

				return (
					<div className={styles.social_icons_and_data} key={key}>
						<div className={styles.social_icons_and_its_name}>
							{icon}
							<div className={styles.social_name}>{call_type}</div>
						</div>
						{loading
							? <Placeholder height="15px" width="100px" className={styles.placeholder} />
							: (
								<div className={styles.customer_nos}>
									<span className={styles.calls_counts}>
										{formatData[key] || GLOBAL_CONSTANTS.zeroth_index}
									</span>
									<span>{static_data}</span>
								</div>
							)}
					</div>
				);
			})}
		</div>
	);
}

export default CallTypeStats;
