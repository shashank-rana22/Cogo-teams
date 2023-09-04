import { Button, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useState } from 'react';

import { getRecipientData } from '../../../../../../../helpers/getRecipientData';
import useGetMailContent from '../../../../../../../hooks/useGetMailContent';

import MailActions from './mailActions';
import MailAttachments from './MailAttachments';
import MailHeader from './MailHeader';
import styles from './styles.module.css';

function MailBody({
	eachMessage = {},
	hasPermissionToEdit = false,
	formattedData = {},
	mailProps = {},
}) {
	const [expandedState, setExpandedState] = useState(false);
	const { source = '' } = formattedData || {};

	const { response, send_by = '', created_at = '', media_url = [] } = eachMessage || {};

	const {
		setButtonType = () => {},
		setEmailState = () => {},
	} = mailProps || {};

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
		setButtonType,
		setEmailState,
		senderAddress,
		recipientData,
		ccData,
		bccData,
		formattedData,
		activeMailAddress : source,
		isDraft           : false,
		subject,
		emailVia          : 'firebase_emails',
	});

	const handleExpandClick = () => {
		if (!expandedState && !bodyMessage) {
			getEmailBody();
			return;
		}
		setExpandedState((prev) => !prev);
	};

	return (
		<div>
			<div className={styles.send_by_name}>
				Replied by
				{' '}
				{send_by || 'user'}
				,
				<span className={styles.time_stamp}>{date || ''}</span>
			</div>
			<div
				className={styles.container}
			>
				<MailHeader
					eachMessage={eachMessage}
					handleClick={handleClick}
					hasPermissionToEdit={hasPermissionToEdit}
				/>

				<div className={styles.subject}>
					Sub:
					{' '}
					{subject}
				</div>

				<div
					className={cl`${styles.body} ${expandedState ? styles.expanded_body : styles.collapsed_body}`}
					dangerouslySetInnerHTML={{ __html: bodyMessage || body }}
				/>

				<Button
					onClick={handleExpandClick}
					style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
					size="xs"
					className={styles.dots_body}
					themeType="linkUi"
				>
					{expandedState ? 'Collapse' : 'Expand'}
				</Button>

				{hasPermissionToEdit && (
					<MailActions
						handleClick={handleClick}
					/>
				)}
				<MailAttachments mediaUrls={media_url} />
			</div>
		</div>
	);
}

export default MailBody;
