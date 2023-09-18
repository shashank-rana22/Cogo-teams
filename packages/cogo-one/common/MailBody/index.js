import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useState } from 'react';

import { getRecipientData } from '../../helpers/getRecipientData';
import useGetMailContent from '../../hooks/useGetMailContent';

import MailActions from './mailActions';
import MailAttachments from './MailAttachments';
import MailHeader from './MailHeader';
import styles from './styles.module.css';

const getEmailText = ({
	expandedState = '',
	loading = false,
}) => {
	if (loading) {
		return 'Loading...';
	}

	if (expandedState) {
		return 'Collapse';
	}

	return 'Expand';
};

const getEmailBorder = ({ isDraft = false, emailStatus = '' }) => {
	if (!isDraft) {
		return '#e0e0e0';
	}

	if (!emailStatus) {
		return '#F9AE64';
	}

	if (emailStatus === 'delivered') {
		return '#ABCD62';
	}

	return '#EE3425';
};

function MailBody({
	eachMessage = {},
	hasPermissionToEdit = false,
	formattedData = {},
	mailProps = {},
	deleteMessage = () => {},
}) {
	const [expandedState, setExpandedState] = useState(false);
	const { source = '' } = formattedData || {};

	const {
		response,
		send_by = '',
		created_at = '',
		media_url = [],
		is_draft: isDraft = false,
		email_status: emailStatus = '',
	} = eachMessage || {};

	const {
		subject = '',
		message_id = '',
		body = '',
		sender: senderAddress = '',
		to_mails: recipientData = [],
		cc_mails: ccData = [],
		bcc_mails: bccData = [],
	} = response || {};

	const {
		getEmailBody = () => {},
		message: bodyMessage = '',
		loading = false,
	} = useGetMailContent({ messageId: message_id, source, setExpandedState });

	const date = created_at && formatDate({
		date       : new Date(created_at),
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
		formatType : 'dateTime',
		separator  : ' ',
	});

	const { handleClick = () => {} } = getRecipientData({
		mailProps,
		senderAddress,
		recipientData,
		ccData,
		bccData,
		formattedData,
		eachMessage,
		activeMailAddress : source,
		isDraft,
		subject,
		emailVia          : 'firebase_emails',
		deleteMessage,
	});

	const handleExpandClick = () => {
		if (!expandedState && !bodyMessage && !isDraft) {
			getEmailBody();
			return;
		}
		setExpandedState((prev) => !prev);
	};

	const emailBorderColor = getEmailBorder({ isDraft, emailStatus });

	return (
		<div className={styles.email_container}>
			<div className={styles.send_by_name}>
				{isDraft ? 'Created' : 'Replied'}
				{' '}
				by
				{' '}
				{send_by || 'user'}
				,
				<span className={styles.time_stamp}>{date || ''}</span>
			</div>

			<div className={styles.container} style={{ border: `1px solid ${emailBorderColor}` }}>
				<MailHeader
					eachMessage={eachMessage}
					handleClick={handleClick}
					hasPermissionToEdit={hasPermissionToEdit}
					handleExpandClick={handleExpandClick}
					isDraft={isDraft}
					emailStatus={emailStatus}
				/>

				<div className={styles.subject}>
					Sub:
					{' '}
					{subject}
				</div>

				<div
					className={cl`${styles.body} 
					${expandedState ? styles.expanded_body : styles.collapsed_body}`}
					dangerouslySetInnerHTML={{ __html: bodyMessage || body }}
				/>

				{hasPermissionToEdit ? (
					<MailActions
						handleClick={handleClick}
						isDraft={isDraft}
					/>
				) : null}

				<MailAttachments mediaUrls={media_url} />

				<div className={styles.extra_controls}>
					<div
						role="presentation"
						onClick={handleExpandClick}
						style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
						className={styles.dots_body}
					>
						{getEmailText({ expandedState, loading })}
					</div>
				</div>
			</div>
		</div>
	);
}

export default MailBody;
