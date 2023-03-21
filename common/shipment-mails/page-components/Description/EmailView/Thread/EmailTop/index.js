import { IcMProfile } from '@cogoport/icons-react';
import { addHours, format, isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function EmailTop({ data = {} }) {
	const displayDate = !isEmpty(data) ? format(
		(addHours(new Date(data?.received_time), 5.5)).toString(),
		' dd MMM, yyyy',
	) : '';

	return (
		<div className={styles.container}>
			<div className={styles.circle}>
				<IcMProfile />
			</div>
			<div className={styles.content}>
				<div className={styles.sender}>
					{data.from?.emailAddress?.name || ''}
					{' '}
					(
					{data.from?.emailAddress?.address}
					)
				</div>

				<div className="">{displayDate}</div>

				{data.toRecipients?.length ? (
					<div className={styles.initial_body}>
						To:
						{' '}
						{data.toRecipients
							.map((item) => item?.emailAddress?.address)
							.join(', ')}
					</div>
				) : null}

				{data.ccRecipients?.length ? (
					<div className={styles.initial_body}>
						CC:
						{' '}
						{data.ccRecipients
							.map((item) => item?.emailAddress?.address)
							.join(', ')}
					</div>
				) : null}
			</div>
		</div>
	);
}

export default EmailTop;
