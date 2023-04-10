import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMProfile, IcMAttach } from '@cogoport/icons-react';
import { subtractDays, addHours } from '@cogoport/utils';
import { formatDistanceToNow } from 'date-fns';
import addMinutes from 'date-fns/addMinutes';
import React from 'react';

import styles from './styles.module.css';

function EmailCard({ data, onClick, activeMail }) {
	const yesterday = subtractDays(new Date(), 1);
	let received_time = addHours(new Date(data?.received_time), 5);
	received_time = addMinutes(received_time, 30);
	const displayDate =	new Date(received_time) > yesterday
		? formatDistanceToNow(received_time)
		: formatDate({
			date       : received_time,
			dateFormat : GLOBAL_CONSTANTS.formats.date['eee, dd MMM, yyyy'],
			formatType : 'date',
		});

	return (
		<div
			className={cl`${styles.container} ${data?.id === activeMail?.id ? styles.active : ''}`}
			role="button"
			tabIndex={0}
			onClick={() => onClick(data)}
		>
			<div className={styles.circle}>
				<IcMProfile />
			</div>

			<div className={styles.content}>
				<div className={styles.row}>
					<div className={styles.sender}>
						{data.sender}
					</div>
					{data?.attachments_attachment_id ? <IcMAttach /> : null}
				</div>

				<div>
					<div className={styles.subject}>{data.subject}</div>
					<div className={styles.subject}>
						{displayDate}
						.
					</div>
				</div>
				<div className={styles.initial_body}>{data.body_preview}</div>
			</div>
		</div>
	);
}

export default EmailCard;
