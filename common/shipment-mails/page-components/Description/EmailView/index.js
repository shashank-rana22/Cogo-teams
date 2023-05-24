import React from 'react';

import useGetAttachements from '../../../hooks/useGetAttachements';
import useGetMail from '../../../hooks/useGetMail';

import styles from './styles.module.css';
import Thread from './Thread';

function EmailView({
	RECIEVE_EMAIL,
	activeMail,
	onAction,
}) {
	const email = RECIEVE_EMAIL;
	const message_id = activeMail?.message_id || activeMail?.id;

	const mailPayload = { email_address: email, message_id, mail_id: activeMail?.id };
	const { getMailApi, getMailRpaApi } = useGetMail({ payload: mailPayload });

	const isFromRpa = getMailApi?.data?.error?.code === 'ErrorItemNotFound';
	const rpaData = getMailRpaApi?.data;
	const rpaMailData = {
		...(rpaData || {}),
		body: {
			content: rpaData?.body,
		},
		ccRecipients: (rpaData?.cc_mails || []).map((item) => ({
			emailAddress: { address: item },
		})),
		toRecipients: (rpaData?.to_mails || []).map((item) => ({
			emailAddress: { address: item },
		})),
		from             : { emailAddress: { address: rpaData?.sender } },
		receivedDateTime : rpaData?.received_time,
		isFromRpa,
	};

	const emailData = isFromRpa ? rpaMailData : getMailApi?.data;
	const loading = isFromRpa ? getMailRpaApi?.loading : getMailApi?.loading;

	const attachmentPaylaod = { email, message_id };
	const { getAttachementsApi } = useGetAttachements({ payload: attachmentPaylaod });
	let content = emailData?.body?.content || '';

	const allAttachements = getAttachementsApi?.data?.value || [];
	allAttachements.forEach((attachment) => {
		content = content.replaceAll(
			`cid:${attachment.contentId}`,
			`data:${attachment.contentType};base64,${attachment.contentBytes}`,
		);
	});

	if (loading) {
		return (
			<div className={styles.loader}>
				<div className={styles.heading}>Please wait while loading your mail</div>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/loading-cargo-insurance.svg"
					alt="email_loader"
					style={{ width: 100, height: 100 }}
				/>
			</div>
		);
	}

	return (
		<div>
			{emailData ? (
				<Thread
					content={content}
					allAttachements={allAttachements}
					emailData={emailData}
					onAction={onAction}
				/>
			) : null}
		</div>
	);
}

export default EmailView;
