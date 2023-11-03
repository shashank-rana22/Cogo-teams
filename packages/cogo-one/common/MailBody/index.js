import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import { getRecipientData } from '../../helpers/getRecipientData';
import useGetSignature from '../../hooks/useGetSignature';

import MailActions from './mailActions';
import MailAttachments from './MailAttachments';
import MailHeader from './MailHeader';
import MessageDetails from './MessageDetails';
import styles from './styles.module.css';

const getEmailText = ({
	expandedState = false,
	loading = false,
}) => {
	if (!expandedState) {
		return 'Expand';
	}

	if (loading) {
		return 'Loading...';
	}

	return 'Collapse';
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

const formatEmailBody = ({ message = '' }) => message?.replace(
	GLOBAL_CONSTANTS.regex_patterns.line_break_regex,
	'<br>',
);

function MailBody({
	eachMessage = {},
	hasPermissionToEdit = false,
	formattedData = {},
	mailProps = {},
	deleteMessage = () => {},
	firestore = {},
	roomId = '',
	expandLoading = false,
	toggleMailBody = () => {},
	fullThread = '',
	expandedStateId = '',
	activeMessageCard = {},
}) {
	const [loading, setLoading] = useState(false);
	const [modalData, setModalData] = useState(null);

	const { source = '' } = formattedData || {};
	const { viewType } = mailProps;

	const {
		response,
		send_by = '',
		created_at = '',
		media_url = [],
		is_draft: isDraft = false,
		email_status: emailStatus = '',
		id = '',
	} = eachMessage || {};

	const {
		subject = '',
		message_id = '',
		body_preview = '',
		sender: senderAddress = '',
		to_mails: recipientData = [],
		cc_mails: ccData = [],
		bcc_mails: bccData = [],
		attachments = [],
	} = response || {};

	const { signature } = useGetSignature({ viewType });

	const date = created_at ? formatDate({
		date       : new Date(created_at),
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
		formatType : 'dateTime',
		separator  : ' ',
	}) : '';

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
		signature,
		setLoading,
		firestore,
		roomId,
		messageRoomId     : id,
		loading,
	});

	const handleExpandClick = () => {
		toggleMailBody({ isDraft, messageId: message_id, messageRoomId: id });
	};

	const emailBorderColor = getEmailBorder({ isDraft, emailStatus });

	const expandedState = expandedStateId === id;

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
					loading={loading}
					setModalData={setModalData}
					modalData={modalData}
					activeMessageCard={activeMessageCard}
					viewType={viewType}
				/>

				<MailAttachments mediaUrls={isEmpty(media_url) ? attachments : media_url} />

				{(!expandLoading && expandedState && fullThread) ? (
					<div
						className={cl`${styles.body} 
							${expandedState ? styles.expanded_body : styles.collapsed_body}`}
						dangerouslySetInnerHTML={{ __html: formatEmailBody({ message: fullThread || '' }) }}
					/>
				) : (
					<div className={cl`${styles.body_preview} ${styles.collapsed_body_preview}`}>
						{body_preview || ''}
					</div>
				)}

				{hasPermissionToEdit ? (
					<MailActions
						handleClick={handleClick}
						isDraft={isDraft}
						loading={loading}
					/>
				) : null}

				<div className={styles.extra_controls}>
					<div
						role="presentation"
						onClick={handleExpandClick}
						style={{ cursor: expandLoading ? 'not-allowed' : 'pointer' }}
						className={styles.dots_body}
					>
						{getEmailText({
							expandedState,
							loading: expandLoading,
						})}
					</div>
				</div>
			</div>

			{isEmpty(modalData)
				? null
				: (
					<MessageDetails
						modalData={modalData}
						setModalData={setModalData}
					/>
				)}
		</div>
	);
}

export default MailBody;
