import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const SECONDS = 60;
const ZERO = 0;

const durationTime = (counter) => {
	let time = '';

	const secs = counter % SECONDS;
	const minute = Math.trunc(counter / SECONDS) % SECONDS;
	const hour = Math.trunc(Math.trunc(counter / SECONDS) / SECONDS) % SECONDS;

	if (hour > ZERO) {
		time = `${hour} hour ${minute} min ${secs} sec`;
	} else if (minute > ZERO) {
		time = `${minute} min ${secs} sec`;
	} else if (secs > ZERO) {
		time = `${secs} sec`;
	}

	return time;
};

const callConfig = [
	{
		Header   : 'Agent Name',
		id       : 'recipient',
		accessor : (item) => <div className={styles.title}>{item?.agent?.name || '-'}</div>,
	},
	{
		Header   : 'User Name',
		id       : 'sent_at',
		accessor : (item) => <div className={styles.title}>{item?.user?.name || '-'}</div>,
	},
	{
		Header   : 'Date',
		accessor : (item) => (
			<div className={styles.title}>
				{item?.communication_start_time ? formatDate({
					date       : item.communication_start_time,
					formatType : 'date',
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				}) : '-'}
			</div>
		),
	},
	{
		Header   : 'Status',
		accessor : (item) => (
			<div className={styles.title}>
				{startCase(item?.call_data?.call_status) || '-'}
			</div>
		),
		id: 'mobile',
	},
	{
		Header   : 'Duration',
		accessor : (item) => ((
			<div className={styles.title}>
				{durationTime(item?.call_data?.duration_of_call) || '0 min 0 sec'}
			</div>
		)),
		id: 'duration',
	},
	{
		Header   : 'Payment Commitment',
		accessor : (item) => {
			const feedbackData = item?.feedback?.[GLOBAL_CONSTANTS.zeroth_index] || {};
			const { feedback_data, feedback_type } = feedbackData || {};

			return !isEmpty(feedback_data) ? (
				<div>
					{feedback_type === 'credit_controller_feedback' && (
						<>
							{(feedback_data || []).map((type) => (
								<div key={type.payment_commitment} className={styles.feedback}>
									{type?.payment_commitment === 'no' && (
										<div className={styles.nocommitment}>No Commitment</div>
									)}
									{type?.commitment_date ? (
										<div>
											{formatDate({
												date       : type?.commitment_date,
												formatType : 'date',
												dateFormat:
													GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
											})}
										</div>
									) : null}
									{type?.commitment_date ? (
										<div>
											{formatAmount({
												amount   : type?.price || ZERO,
												currency : type?.currency,
												options  : {
													style                 : 'currency',
													currencyDisplay       : 'code',
													maximumFractionDigits : 0,
												},
											})}
										</div>
									) : null}
								</div>
							))}
						</>
					)}
				</div>
			) : (
				<div className={styles.nocommitment}>No Commitment</div>
			);
		},
		id: 'paymentcommitment',
	},
	{
		Header   : 'Call Remarks',
		accessor : (item) => (item?.communication_summary || item?.title ? (
			<div className={styles.title}>{item?.communication_summary || item?.title}</div>
		) : (
			'-'
		)),
		id: 'callremarks',
	},
];

export default callConfig;
