import React from 'react';

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
	const content = emailData?.body?.content || '';

	if (loading) {
		return <div>Loading full mail......</div>;
	}

	return (
		<div className={styles.container}>
			<Thread
				content={content}
				emailData={emailData}
				onAction={onAction}
			/>
		</div>
	);
}

export default EmailView;
