import { cl, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import useGetMail from '../../../../hooks/useGetMail';
import useGetMailAttachment from '../../../../hooks/useGetMailAttachment';

import EmailBodyStructure from './EmailBodyStructure';
import Header from './Header';
import MailAttachments from './MailAttachment';
import styles from './styles.module.css';

const MAIL_LOADING_SKELETON_LENGTH = 5;

function MailConversation({ mailProps = {} }) {
	const {
		activeMail,
		setButtonType = () => {},
		setEmailState = () => {},
		activeMailAddress = '',
	} = mailProps;

	const {
		data = {},
		loading,
	} = useGetMail({ activeMail, emailAddress: activeMailAddress });

	const {
		attachmentData = {},
		attachmentLoading,
	} = useGetMailAttachment({ activeMail, emailAddress: activeMailAddress });

	const {
		sentDateTime = '',
		subject = '',
		sender = {},
		toRecipients = [],
		body = {},
		ccRecipients = [],
		bccRecipients = [],
		hasAttachments,
	} = data || {};

	const { content = '' } = body || {};

	const allAttachements = attachmentData?.value || [];

	const newContent = allAttachements.reduce((prevContent, attachment) => prevContent.replaceAll(
		`cid:${attachment.contentId}`,
		`data:${attachment.contentType};base64,${attachment.contentBytes}`,
	), content);

	const senderAddress = sender?.emailAddress?.address;
	const recipientData = (toRecipients || []).map((item) => item?.emailAddress?.address);
	const ccData = (ccRecipients || []).map((item) => item?.emailAddress?.address);
	const bccData = (bccRecipients || []).map((item) => item?.emailAddress?.address);

	return (
		<div className={styles.container}>
			<Header
				subject={subject}
				loading={loading || attachmentLoading}
				setButtonType={setButtonType}
				setEmailState={setEmailState}
				senderAddress={senderAddress}
				recipientData={recipientData}
				ccData={ccData}
				bccData={bccData}
				activeMailAddress={activeMailAddress}
			/>

			<EmailBodyStructure
				sender={sender}
				recipientData={recipientData}
				ccData={ccData}
				bccData={bccData}
				loading={loading || attachmentLoading}
			/>

			<div className={styles.message_div}>
				{(loading || attachmentLoading) ? (
					<>
						<div className={styles.time_stamp}>
							<Placeholder width="80px" height="10px" />
						</div>
						<div className={styles.receive_message_container}>
							{[...Array(MAIL_LOADING_SKELETON_LENGTH).keys()].map(
								(itm) => (
									<Placeholder
										key={itm}
										width="500px"
										height="20px"
										margin="0px 0px 10px 0px"
									/>
								),
							)}
						</div>
					</>
				) : (
					<>
						<div className={styles.time_stamp}>
							{formatDate({
								date       : sentDateTime,
								dateFormat : GLOBAL_CONSTANTS.formats.date['eee, dd MMM, yyyy'],
								timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
								formatType : 'dateTime',
								separator  : ' ',
							})}
						</div>
						<div
							className={cl`${styles.receive_message_container}
										${hasAttachments ? styles.receive_preview_div : ''}
										`}
							dangerouslySetInnerHTML={{ __html: newContent }}
						/>
						<MailAttachments
							attachmentData={attachmentData}
							loading={loading || attachmentLoading}
						/>
					</>
				)}
			</div>
		</div>
	);
}

export default MailConversation;
