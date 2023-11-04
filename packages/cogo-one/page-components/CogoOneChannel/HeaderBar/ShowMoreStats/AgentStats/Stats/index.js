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
const MIN_ROUND_UP_DIGIT = 2;
const DECIMAL_VALUE = 0;

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
		avg_response_time : avgResponseTime = 0, rate_revert : rateRevert = 0, agent_msg_stats : agentMsgStats = [],
		mail_stats = {},
	} = agentStatsData || {};

	const {
		sent_count = 0,
		received_count = 0,
		replied_count = 0,
	} = mail_stats || {};

	const { data, escalateLoading } = useGetAgentTimelineEscalate({ viewType, timePeriodValue });

	const escalateCount = data?.total_count || MIN_COUNT;

	const averageRating = (rating || []).find((item) => item?.avg_rating)?.avg_rating;

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
	const totalCallReceived = incoming_answered + incoming_missed;
	const totalChatAssigned = active + escalated + warning;

	const customerSatisfactionScore = averageRating ? (averageRating).toFixed(DECIMAL_VALUE) : null;

	const STATS_FEEDBACK_COUNT = {
		no_of_bookings              : getFormattedNumber(booked || MIN_COUNT),
		no_of_quotation_send        : getFormattedNumber(totalQuotationSend || MIN_COUNT),
		chats_assigned              : getFormattedNumber(totalChatAssigned || MIN_COUNT),
		calls_made                  : getFormattedNumber(totalCallMade || MIN_COUNT),
		calls_received              : getFormattedNumber(totalCallReceived || MIN_COUNT),
		customer_satisfaction_score : customerSatisfactionScore,
		no_of_rates_reverted        : getFormattedNumber(rateRevert || MIN_COUNT),
		no_of_rate_sheets_received  : '0',
		avg_response_time           : `${(avgResponseTime || MIN_COUNT)?.toFixed(MIN_ROUND_UP_DIGIT)} min`,
		emails_send_count           : getFormattedNumber(emailCount || MIN_COUNT),
		escalate_chats_count        : getFormattedNumber(escalateCount || MIN_COUNT),
		total_mails_sent            : getFormattedNumber(sent_count || MIN_COUNT),
		total_mails_received        : getFormattedNumber(received_count || MIN_COUNT),
		total_mail_replies          : getFormattedNumber(replied_count || MIN_COUNT),
	};

	const STATS_FEEDBACK_MAPPING = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.stats_feedback_count;

	const renderIcon = averageRating ? RATING_ELEMENTS[averageRating >= MIN_AVERAGE_RATING ? 'happy' : 'sad'].image
		: RATING_ELEMENTS.sad.image;

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
						{item === 'customer_satisfaction_score' ? (
							renderIcon
						) : null}

						<div className={styles.count}>
							{(loading || escalateLoading) ? <Placeholder width="80px" height="40px" /> : (
								<div>{STATS_FEEDBACK_COUNT[item]}</div>
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
