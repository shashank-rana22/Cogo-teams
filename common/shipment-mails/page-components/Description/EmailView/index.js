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
		return <div>Loading full mail......</div>;
	}

	return (
		<div className={styles.container}>
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
