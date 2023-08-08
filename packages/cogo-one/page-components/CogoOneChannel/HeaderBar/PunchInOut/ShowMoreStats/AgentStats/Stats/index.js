import { Placeholder } from '@cogoport/components';
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

function Stats({
	totalQuotationSend = 0,
	statsData = {},
	booked = 0,
	calls = [],
	loading = false,
}) {
	const { chat_stats = {} } = statsData || {};
	const { active = 0 } = chat_stats || {};

	const {
		incoming_answered = 0,
		incoming_missed = 0,
		outgoing_answered = 0,
		outgoing_missed = 0,
	} = calls[GLOBAL_CONSTANTS.zeroth_index] || [];

	const totalCallMade = outgoing_answered + outgoing_missed;
	const totalCallReceive = incoming_answered + incoming_missed;

	const FEEDBACK_COUNT_MAPPING = {
		no_of_bookings       : booked,
		no_of_quotation_send : totalQuotationSend,
	};

	const STATS_COUNT_MAPPING = {
		chats_assigned : active,
		calls_made     : totalCallMade,
		calls_received : totalCallReceive,
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
											className={styles.emoji_icon}
										/>
									) : null}
								<div className={styles.count}>
									{loading ? <Placeholder width="80px" height="40px" /> : (
										<div>{getFormattedNumber(FEEDBACK_COUNT_MAPPING[name] || MIN_COUNT)}</div>
									)}
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
								{loading ? <Placeholder width="80px" height="40px" /> : (
									<div>{getFormattedNumber(STATS_COUNT_MAPPING[name] || MIN_COUNT)}</div>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default Stats;
