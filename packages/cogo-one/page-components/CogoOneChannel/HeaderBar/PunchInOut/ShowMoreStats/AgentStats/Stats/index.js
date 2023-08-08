import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDown } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';

import {
	AGENT_WISE_FEEDACK_MAPPING,
	AGENT_WISE_STATS_MAPPING,
} from '../../../../../../../configurations/agent-wise-feedback-mapping';
import { getFormattedNumber } from '../../../../../../../helpers/getFormattedNumber';

import styles from './styles.module.css';

const MIN_COUNT = 0;

const getCallCountByType = ({ list, callType }) => list.filter((call) => call?.call_type === callType).length;

function Stats({
	bookingCount = 0,
	statsData = {},
	callData = {},
	quotationData = {},
}) {
	const { chat_stats = {} } = statsData || {};
	const { active = 0 } = chat_stats || {};
	const { list = [] } = callData || {};
	const { total_count: quotationCount = 0 } = quotationData || {};

	const FEEDBACK_COUNT_MAPPING = {
		no_of_bookings       : bookingCount,
		no_of_quotation_send : quotationCount,
	};

	const STATS_COUNT_MAPPING = {
		chats_assigned : active,
		calls_made     : getCallCountByType({ list, callType: 'outgoing' }),
		calls_received : getCallCountByType({ list, callType: 'incoming' }),
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
											width={30}
											height={30}
										/>
									) : null}
								<div className={styles.count}>
									{getFormattedNumber(FEEDBACK_COUNT_MAPPING[name] || MIN_COUNT)}
								</div>
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
							<div className={styles.count}>
								{getFormattedNumber(STATS_COUNT_MAPPING[name] || MIN_COUNT)}
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default Stats;
