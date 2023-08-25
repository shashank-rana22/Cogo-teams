import { Placeholder, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';

import { RATING_ELEMENTS } from '../../../../../../constants';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../../../constants/viewTypeMapping';
import { getFormattedNumber } from '../../../../../../helpers/getFormattedNumber';
import useGetAgentTimelineEscalate from '../../../../../../hooks/useGetAgentTimelineEscalate';

import styles from './styles.module.css';

const MIN_COUNT = 0;
const MIN_AVERAGE_RATING = 3;
const ESCALATE_DEFAULT_CHAT_COUNT = 0;

function Stats({
	totalQuotationSend = 0,
	statsData = {},
	booked = 0,
	calls = [],
	loading = false,
	viewType = '',
	agentStatsData = {},
	timePeriodValue = '',
	isShowActivityGraph = false,
}) {
	const { chat_stats = {} } = statsData || {};
	const {
		rating = [],
		avg_response_time : avgResponseTime = {}, rate_revert : rateRevert = 0, agent_msg_stats : agentMsgStats = [],
	} = agentStatsData || {};

	const { data, escalateLoading } = useGetAgentTimelineEscalate({ viewType, timePeriodValue });

	const escalateCount = data?.total_count || ESCALATE_DEFAULT_CHAT_COUNT;

	const { avg_rating: averageRating = '' } = rating || [];

	const emailObj = Array.isArray(agentMsgStats)
		? (agentMsgStats || []).filter((item) => item.type === 'email') : [];

	const { count: emailCount } = emailObj?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const { active = 0, escalated = 0, warning = 0 } = chat_stats || {};

	const {
		incoming_answered = 0,
		incoming_missed = 0,
		outgoing_answered = 0,
		outgoing_missed = 0,
	} = calls[GLOBAL_CONSTANTS.zeroth_index] || [];

	const totalCallMade = outgoing_answered + outgoing_missed;
	const totalCallReceive = incoming_answered + incoming_missed;
	const totalChatAssigne = active + escalated + warning;

	const STATS_FEEDBACK_COUNT = {
		no_of_bookings              : booked,
		no_of_quotation_send        : totalQuotationSend,
		chats_assigned              : totalChatAssigne,
		calls_made                  : totalCallMade,
		calls_received              : totalCallReceive,
		customer_satisfaction_score : averageRating,
		no_of_rates_reverted        : rateRevert,
		no_of_rate_sheets_received  : '0',
		avg_response_time           : avgResponseTime,
		emails_send_count           : emailCount,
		escalate_chats_count        : escalateCount,

	};

	const STATS_FEEDBACK_MAPPING = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.stats_feedback_count;

	return (
		<div className={styles.stats_container}>
			{(STATS_FEEDBACK_MAPPING || []).map((item) => (
				<div
					className={cl`${styles.each_stats_div}
				 ${isShowActivityGraph ? '' : styles.new_each_stats}`}
					key={item}
				>
					<div className={styles.title}>{startCase(item)}</div>
					<div className={styles.count_with_icon}>
						{item === 'customer_satisfaction_score' && !averageRating ? (
							RATING_ELEMENTS[averageRating >= MIN_AVERAGE_RATING ? 'happy' : 'sad'].image
						) : null}

						<div className={styles.count}>
							{(loading || escalateLoading) ? <Placeholder width="80px" height="40px" /> : (
								<div>{getFormattedNumber(STATS_FEEDBACK_COUNT[item] || MIN_COUNT)}</div>
							)}
						</div>
						{(item === 'customer_satisfaction_score' && averageRating)
							? (
								<div className={styles.arrow_icon}>
									{RATING_ELEMENTS[averageRating >= MIN_AVERAGE_RATING ? 'happy' : 'sad'].arrow}
								</div>
							) : null}
					</div>
				</div>
			))}
		</div>
	);
}

export default Stats;
