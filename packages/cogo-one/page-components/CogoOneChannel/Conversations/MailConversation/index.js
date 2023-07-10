import { cl, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, format } from '@cogoport/utils';

import useGetMail from '../../../../hooks/useGetMail';

import EmailBodyStructure from './EmailBodyStructure';
import Header from './Header';
import MailAttachments from './MailAttachment';
import styles from './styles.module.css';

const MAIL_LOADING_SKELETON_LENGTH = 5;

function MailConversation({ mailProps = {} }) {
	const {
		activeMail,
		setButtonType = () => {},
		setBccArray = () => {},
		setRecipientArray = () => {},
		setEmailState = () => {},
		userEmailAddress = '',
	} = mailProps;

	const { data = {}, loading } = useGetMail({ activeMail, emailAddress: userEmailAddress });

	const {
		sentDateTime = '',
		subject = '',
		sender = {},
		toRecipients = [],
		body = {},
		ccRecipients = [],
		hasAttachments,
	} = data || {};

	const { content = '' } = body || {};

	const senderAddress = sender?.emailAddress?.address;
	const recipientData = (toRecipients || []).map((item) => item?.emailAddress?.address);
	const ccData = (ccRecipients || []).map((item) => item?.emailAddress?.address);

	const emptyCcRecipient = isEmpty(ccRecipients || []);

	const handlClick = (val) => {
		setButtonType(val);
		setBccArray(val !== 'forward' ? ccData : []);
		setRecipientArray(val !== 'forward' ? [senderAddress] : []);
		setEmailState({
			subject,
			body: '',
		});
	};

	return (
		<div className={styles.container}>
			<Header
				subject={subject}
				loading={loading}
				handlClick={handlClick}
			/>

			<EmailBodyStructure
				sender={sender}
				recipientData={recipientData}
				ccData={ccData}
				emptyCcRecipient={emptyCcRecipient}
				loading={loading}
			/>

			<div className={styles.message_div}>
				{loading ? (
					<>
						<div className={styles.time_stamp}>
							<Placeholder width="80px" height="10px" />
						</div>
						<div className={styles.receive_message_container}>
							{[...Array(MAIL_LOADING_SKELETON_LENGTH).keys()].map((itm) => (
								<Placeholder
									key={itm}
									width="500px"
									height="20px"
									margin="0px 0px 10px 0px"
								/>
							))}
						</div>
					</>
				) : (
					<>
						<div className={styles.time_stamp}>
							{format(sentDateTime, GLOBAL_CONSTANTS.formats.datetime['EEEE, HH:mm a dd MMM yyy'])}
						</div>
						<div
							className={cl`${styles.receive_message_container}
										${hasAttachments ? styles.receive_preview_div : ''}
										`}
							dangerouslySetInnerHTML={{ __html: content }}
						/>
						<MailAttachments
							activeMail={activeMail}
							emailAddress={userEmailAddress}
						/>
					</>
				)}
			</div>
		</div>
	);
}

export default MailConversation;
