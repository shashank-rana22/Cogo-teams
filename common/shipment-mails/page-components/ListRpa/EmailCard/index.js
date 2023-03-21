import { IcMProfile, IcMAttach } from '@cogoport/icons-react';
import { format, subtractDays, addHours, addMinutes } from '@cogoport/utils';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';

import styles from './styles.module.css';

function EmailCard({ data, onClick }) {
	const yesterday = subtractDays(new Date(), 1);
	let received_time = addHours(new Date(data.received_time), 5);
	received_time = addMinutes(new Date(received_time), 30);

	const diaplayDate =		new Date(received_time) > yesterday
		? formatDistanceToNow(received_time)
		: format(received_time, 'dd MMM yyyy');

	return (
		<div className={styles.container} role="button" tabIndex={0} onClick={() => onClick(data)}>
			<div className={styles.circle}>
				<IcMProfile />
			</div>
			<div className={styles.content}>
				<div className={styles.row}>
					<div className={styles.sender}>{data.sender}</div>
					{data?.attachments_attachment_id ? <IcMAttach /> : null}
				</div>
				<div className={styles.row}>
					<div className={styles.subject}>{data.subject}</div>
					<div className={styles.subject} />
					{diaplayDate}
					.
				</div>
				<div className={styles.initial_body}>{data.body_preview}</div>

			</div>
		</div>
	);
}

export default EmailCard;
