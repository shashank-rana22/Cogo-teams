import { Avatar } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import React from 'react';

import MessageBody from '../../../../../../common/MessageBody';

import styles from './styles.module.css';

function ReceiveComponent({
	eachMessage = {},
}) {
	const { created_at = {}, send_by = '', response = {} } = eachMessage || {};

	const date = created_at ? formatDate({
		date       : new Date(created_at),
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
		formatType : 'dateTime',
		separator  : ' ',
	}) : null;

	return (
		<div className={styles.container}>
			<div className={styles.sender_details}>
				<span className={styles.sender_name}>
					{startCase(send_by)}
				</span>
				{date || ''}
			</div>

			<div className={styles.message}>
				<Avatar
					personName={send_by}
					alt="img"
					disabled={false}
					size="30px"
					className={styles.styled_avatar}
				/>
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

export default ReceiveComponent;
