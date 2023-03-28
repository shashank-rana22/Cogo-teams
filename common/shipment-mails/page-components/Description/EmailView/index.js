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
	const { emailData, loading } = useGetMail(email, message_id, activeMail?.id);
	const { getAttachementsApi } = useGetAttachements(email, message_id);
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
			<Thread
				content={content}
				allAttachements={allAttachements}
				emailData={emailData}
				onAction={onAction}
			/>
		</div>
	);
}

export default EmailView;
