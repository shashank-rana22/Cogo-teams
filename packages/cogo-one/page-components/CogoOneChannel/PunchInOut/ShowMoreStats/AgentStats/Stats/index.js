import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDown } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';

import {
	AGENT_WISE_FEEDACK_MAPPING,
	AGENT_WISE_STATS_MAPPING,
} from '../../../../../../configurations/agent-wise-feedback-mapping';

import styles from './styles.module.css';

const MIN_COUNT = 0;

function Stats({
	bookingCount = 0,
	statsData = {},
	callData = {},
}) {
	const { chat_stats = {} } = statsData || {};
	const { active = 0 } = chat_stats || {};
	const { total_count: callCount = 0 } = callData || {};

	const FEEDBACK_COUNT_MAPPING = {
		no_of_bookings: bookingCount,
	};

	const STATS_COUNT_MAPPING = {
		chats_assigned : active,
		calls_made     : callCount,
	};

	return (
		<>
			<div className={styles.top_stats_content}>
				{AGENT_WISE_FEEDACK_MAPPING.map((item) => {
					const { label, name, hasIcon } = item;
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
								<div className={styles.count}>{FEEDBACK_COUNT_MAPPING[name] || MIN_COUNT}</div>
								{hasIcon ? <IcMDown className={styles.arrow_icon} /> : null}
							</div>
						</div>
					);
				})}
			</div>
			<div className={styles.bottom_stats_content}>
				{AGENT_WISE_STATS_MAPPING.map((item) => {
					const { label, name } = item;

					return (
						<div className={styles.each_div} key={name}>
							<div className={styles.title}>{label}</div>
							<div className={styles.count}>{STATS_COUNT_MAPPING[name] || MIN_COUNT}</div>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default Stats;
