import { cl, Placeholder } from '@cogoport/components';
import { isEmpty, format } from '@cogoport/utils';

import useGetMail from '../../../../hooks/useGetMail';
import useGetMailAttachment from '../../../../hooks/useGetMailAttachment';

import Emailbody from './Emailbody';
import Header from './Header';
import MailAttachments from './MailAttachment';
import styles from './styles.module.css';

function MailConversation({ mailProps }) {
	const {
		activeMail,
		setButtonType = () => {},
		setShowMailModal = () => {},
		setBccArray = () => {},
		setRecipientArray = () => {},
		setEmailState = () => {},
		emailAddress = '',
	} = mailProps;

	const { data = {}, loading } = useGetMail({ activeMail, emailAddress });
	const { attachmentData = {}, attachmentLoading } = useGetMailAttachment({ activeMail, emailAddress });
	const allAttachements = attachmentData?.value || [];

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
		setShowMailModal(true);
	};

	return (
		<div className={styles.container}>
			<Header
				subject={subject}
				loading={loading}
				setButtonType={setButtonType}
				setShowMailModal={setShowMailModal}
				handlClick={handlClick}
			/>
			<Emailbody
				sender={sender}
				recipientData={recipientData}
				ccData={ccData}
				emptyCcRecipient={emptyCcRecipient}
				loading={loading}
			/>

			{loading ? (
				<div className={styles.message_div}>
					<div className={styles.time_stamp}>
						<Placeholder width="80px" height="10px" />
					</div>
					<div className={styles.receive_message_container}>
						{[...Array(5)].map(() => (
							<Placeholder width="500px" height="20px" margin="0px 0px 10px 0px" />
						))}
					</div>
				</div>
			) : (
				<div>
					<div className={styles.message_div}>
						<div className={styles.time_stamp}>
							{format(sentDateTime, 'EEEE, HH:mm a dd MMM yyy')}
						</div>
						<div
							role="presentation"
							className={cl`${hasAttachments ? styles.reveive_preview_div : ''} 
								${styles.receive_message_container}`}
							dangerouslySetInnerHTML={{ __html: content }}
						/>
					</div>
				</div>
			)}
			<MailAttachments allAttachements={allAttachements} loading={attachmentLoading} />
		</div>
	);
}

export default MailConversation;
