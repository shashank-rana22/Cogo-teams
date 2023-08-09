import { Button, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import { getSubject } from '../../helpers/getRecipientData';
import useGetMailContent from '../../hooks/useGetMailContent';

import MailActions from './mailActions';
import MailAttachments from './MailAttachments';
import MailHeader from './MailHeader';
import styles from './styles.module.css';

function MailBody({
	eachMessage = {},
	setMailActions = () => {},
	mailActions = {},
	hasPermissionToEdit = false,
	formattedData = {},
}) {
	const { source = '' } = formattedData || {};

	const { response, send_by = '', created_at = '', media_url = [] } = eachMessage || {};

	const {
		subject = '',
		message_id = '',
		body = '',
	} = response || {};

	const {
		getEmailBody,
		message: bodyMessage = '',
		loading = false,
	} = useGetMailContent({ messageId: message_id, source });

	const { data } = mailActions || {};
	const { response: selectedResponse = {} } = data || {};

	const { message_id: selectedMessageid } = selectedResponse || {};

	const date = created_at && formatDate({
		date       : new Date(created_at),
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
		formatType : 'dateTime',
		separator  : ' ',
	});

	const handleClick = ({ buttonType }) => {
		setMailActions({
			actionType : buttonType,
			data       : {
				...eachMessage,
				response: {
					...eachMessage?.response,
					subject: getSubject(
						{
							subject : eachMessage?.response?.subject,
							val     : buttonType,
						},
					),
				},
			},
		});
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
				className={cl`${styles.container} 
				${selectedMessageid === message_id ? styles.active_container : ''}`}
			>
				<MailHeader
					eachMessage={eachMessage}
					handleClick={handleClick}
					hasPermissionToEdit={hasPermissionToEdit}
				/>

				<div className={styles.subject}>
					{subject}
				</div>

				<div
					className={styles.body}
					dangerouslySetInnerHTML={{ __html: bodyMessage || body }}
				/>

				{!bodyMessage && (
					<Button
						onClick={getEmailBody}
						role="presentation"
						style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
						size="xs"
						className={styles.dots_body}
						themeType="tertiary"
					>
						...
					</Button>
				)}

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
