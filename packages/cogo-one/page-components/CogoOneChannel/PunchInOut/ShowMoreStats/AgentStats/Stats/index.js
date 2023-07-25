import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDown } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';

import {
	AGENT_WISE_FEEDACK_MAPPING,
	AGENT_WISE_STATS_MAPPING,
} from '../../../../../../configurations/agent-wise-feedback-mapping';

import styles from './styles.module.css';

function Stats() {
	return (
		<>
			<div className={styles.top_stats_content}>
				{AGENT_WISE_FEEDACK_MAPPING.map((item) => {
					const { label, name, hasIcon, count } = item;
					return (
						<div className={styles.each_stats_div} key={name}>
							<div className={styles.title}>{label}</div>
							<div className={styles.count_with_icon}>
								{hasIcon
									? (
										<Image
											src={GLOBAL_CONSTANTS.image_url.sad_icon}
											alt="sad-emoji"
											width={55}
											height={55}
										/>
									) : null}
								<div className={styles.count}>{count}</div>
								{hasIcon ? <IcMDown className={styles.arrow_icon} /> : null}
							</div>
						</div>
					);
				})}
			</div>
			<div className={styles.bottom_stats_content}>
				{AGENT_WISE_STATS_MAPPING.map((item) => {
					const { label, name, count } = item;

					return (
						<div className={styles.each_div} key={name}>
							<div className={styles.title}>{label}</div>
							<div className={styles.count}>{count}</div>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default Stats;
