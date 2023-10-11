import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import React from 'react';

import MessageBody from '../../../../../../common/MessageBody';

import styles from './styles.module.css';

function SentComponent({
	eachMessage = {},
}) {
	const { created_at = {}, response = {} } = eachMessage || {};

	const date = created_at ? formatDate({
		date       : new Date(created_at),
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
		formatType : 'dateTime',
		separator  : ' ',
	}) : null;

	return (
		<div className={styles.container}>
			<div className={styles.details}>
				<div className={styles.sent_date}>
					{date}
				</div>
				<div className={styles.message_card}>
					<MessageBody
						response={response}
						message_type={response?.message_type || 'text'}
					/>
				</div>
			</div>

		</div>
	);
}

export default SentComponent;
