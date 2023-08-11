import { Placeholder, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';

import { RATING_ELEMENTS } from '../../../../../../../constants';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../../../../constants/viewTypeMapping';
import { getFormattedNumber } from '../../../../../../../helpers/getFormattedNumber';

import styles from './styles.module.css';

const MIN_COUNT = 0;
const MIN_COUNT_FOUR = 5;
const MIN_RATING = 3;

function Stats({
	totalQuotationSend = 0,
	statsData = {},
	booked = 0,
	calls = [],
	loading = false,
	viewType = '',
	rating = [],
}) {
	const { chat_stats = {} } = statsData || {};
	const { avg_rating: averageRating = '' } = rating || [];

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
	};

	const STATS_FEEDBACK_MAPPING = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.stats_feedback_count;

	return (
		<div className={styles.stats_container}>
			{(STATS_FEEDBACK_MAPPING || []).map((item) => (
				<div
					className={cl`${styles.each_stats_div} 
				${(STATS_FEEDBACK_MAPPING.length >= MIN_COUNT_FOUR) ? styles.stat_box : ''}`}
					key={item}
				>
					<div className={styles.title}>{startCase(item)}</div>
					<div className={styles.count_with_icon}>
						{item === 'customer_satisfaction_score' ? (
							RATING_ELEMENTS[averageRating >= MIN_RATING ? 'happy' : 'sad'].image
							|| RATING_ELEMENTS.default.image
						) : null}
						<div className={styles.count}>
							{loading ? <Placeholder width="80px" height="40px" /> : (
								<div>{getFormattedNumber(STATS_FEEDBACK_COUNT[item] || MIN_COUNT)}</div>
							)}
						</div>
						{(item === 'customer_satisfaction_score')
							? (
								<div className={styles.arrow_icon}>
									{RATING_ELEMENTS[averageRating >= MIN_RATING ? 'happy' : 'sad'].arrow
									|| RATING_ELEMENTS.default.arrow}
								</div>
							) : null}
					</div>
				</div>
			))}
		</div>
	);
}

export default Stats;
