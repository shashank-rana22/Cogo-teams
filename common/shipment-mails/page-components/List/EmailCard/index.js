import { cl } from '@cogoport/components';
import { IcMProfile, IcMAttach } from '@cogoport/icons-react';
import { subtractDays, format } from '@cogoport/utils';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';

import styles from './styles.module.css';

function EmailCard({ activeMail, data = {}, onClick = () => {} }) {
	const yesterday = subtractDays(new Date(), 1);
	const displayDate =	new Date(data?.receivedDateTime) > yesterday
		? formatDistanceToNow(new Date(data?.receivedDateTime), { addSuffix: true })
		: format(
			data?.receivedDateTime,
			'dd MMM, yyyy',
		);

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
						{data.from?.emailAddress?.name || data.from?.emailAddress?.address}
					</div>
					{data?.hasAttachments ? <IcMAttach /> : null}
				</div>

				<div>
					<div className={styles.subject}>{data.subject}</div>
					<div className={styles.subject}>
						{displayDate}
						.
					</div>
				</div>
				<div className={styles.initial_body}>{data.bodyPreview}</div>
			</div>
		</div>
	);
}

export default EmailCard;
