import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import { BUTTON_MAPPING } from '../../constants/mailConstants';
import useGetMailContent from '../../hooks/useGetMailContent';

import MailHeader from './MailHeader';
import styles from './styles.module.css';

const NULL_SUBJECT_LENGTH = 0;
const MAXIMUM_ALLOWED_SUBJECT_LENGTH = 250;

const EMAIL_SUBJECT_PREFIX_MAPPING = {
	reply   : 'RE',
	forward : 'FW',
};

function getSubject({ subject = '', val = '' }) {
	const formatedSubject = subject.replace(GLOBAL_CONSTANTS.regex_patterns.email_subject_prefix, '').trim();

	const emailPrefix = EMAIL_SUBJECT_PREFIX_MAPPING[val];

	return (formatedSubject?.length || NULL_SUBJECT_LENGTH) > MAXIMUM_ALLOWED_SUBJECT_LENGTH
		? subject : `${emailPrefix}: ${formatedSubject}`;
}

function MailBody({
	eachMessage = {},
	setMailActions = () => {},
	mailActions = {},
	hasPermissionToEdit = false,
}) {
	const { response, send_by = '', created_at = 0 } = eachMessage || {};

	const {
		subject = '',
		message_id = '',
		body = '',
	} = response || {};

	const { getEmailBody, message:bodyMessage = '', loading = false } = useGetMailContent({ messageId: message_id });

	const { data } = mailActions || {};
	const { response:selectedResponse = {} } = data || {};

	const { message_id:selectedMessageid } = selectedResponse || {};

	const date = created_at && formatDate({
		date       : new Date(created_at),
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
		formatType : 'dateTime',
		separator  : ' ',
	});

	return (
		<div>
			<div className={styles.send_by_name}>
				Replied by
				{' '}
				{send_by || 'kam'}
				,
				<span className={styles.time_stamp}>{date || ''}</span>
			</div>
			<div
				className={styles.container}
				style={{ border: (selectedMessageid === message_id) ? '1px solid #F9AE64' : '1px solid #e0e0e0' }}
			>

				<MailHeader
					eachMessage={eachMessage}
					setMailActions={setMailActions}
					hasPermissionToEdit={hasPermissionToEdit}
				/>
				<div className={styles.subject}>{subject}</div>
				{!bodyMessage ? (
					<>
						<div className={styles.body} dangerouslySetInnerHTML={{ __html: body }} />
						<Button
							onClick={getEmailBody}
							role="presentation"
							style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
							size=""
							className={styles.dots_body}
							themeType="tertiary"
						>
							...
						</Button>
					</>
				) : <div className={styles.body} dangerouslySetInnerHTML={{ __html: bodyMessage }} />}
				{hasPermissionToEdit && (
					<div className={styles.buttons_flex}>
						{BUTTON_MAPPING.map((eachButton) => {
							const { buttonName, icon:Icon, key } = eachButton || {};
							return (
								<Button
									key={key}
									themeType="secondary"
									size="sm"
									className={styles.styled_button}
									onClick={() => setMailActions({
										actionType : key,
										data       : {
											...eachMessage,
											response: {
												...eachMessage?.response,
												subject: getSubject(
													{ subject: eachMessage?.response?.subject, val: key },
												),
											},
										},

									})}
								>
									<Icon className={styles.icon} />
									<div className={styles.button_text}>{buttonName}</div>
								</Button>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
export default MailBody;
