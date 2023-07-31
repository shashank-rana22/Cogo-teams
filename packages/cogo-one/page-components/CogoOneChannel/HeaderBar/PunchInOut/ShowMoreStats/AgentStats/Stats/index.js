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
// const ZERO_SCORE = 0;
// const ONE_SCORE = 1;
// const TWO_SCORE = 2;
// const THREE_SCORE = 3;
// const FOUR_SCORE = 4;
// const FIVE_SCORE = 5;

// const FEEDBACK_EMOJI_MAPPING = [
// 	{ range: [ZERO_SCORE, ONE_SCORE], emoji: '😞' },
// 	{ range: [ONE_SCORE, TWO_SCORE], emoji: '😔' },
// 	{ range: [TWO_SCORE, THREE_SCORE], emoji: '😐' },
// 	{ range: [THREE_SCORE, FOUR_SCORE], emoji: '🙂' },
// 	{ range: [FOUR_SCORE, FIVE_SCORE], emoji: '😄' },
// ];

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

	const outgoingCalls = list.filter((call) => call.call_type === 'outgoing').length;
	const incomingCalls = list.filter((call) => call.call_type === 'incoming').length;

	const FEEDBACK_COUNT_MAPPING = {
		no_of_bookings       : bookingCount,
		no_of_quotation_send : quotationCount,
	};

	const STATS_COUNT_MAPPING = {
		chats_assigned : active,
		calls_made     : outgoingCalls,
		calls_received : incomingCalls,
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
											width={40}
											height={40}
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
							<div className={styles.count}>{STATS_COUNT_MAPPING[name] || MIN_COUNT}</div>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default Stats;
