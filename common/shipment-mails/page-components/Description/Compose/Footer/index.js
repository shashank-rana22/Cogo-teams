import { Button } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import React, { useState } from 'react';

import useForwardEmail from '../../../../hooks/useForwardEmail';
import useReplyAllEmail from '../../../../hooks/useReplyAllEmail';
import useReplyEmail from '../../../../hooks/useReplyEmail';
import useSendEmail from '../../../../hooks/useSendEmail';

import Attachement from './Attachment';
import styles from './styles.module.css';

function Footer({
	content,
	composingEmail = {},
	COMPOSE_EMAIL,
	handleSubmit,
	onError,
	action,
	onCreate,
	userEmailArray,
	ccEmailArray,
}) {
	const userId = useSelector(({ profile }) => profile?.id);
	const { createEmail, mailApi } = useSendEmail();
	const { forwardEmail, forwardMailApi } = useForwardEmail();
	const { replyAllEmail, replyAllMailApi } = useReplyAllEmail();
	const { replyEmail, replyMailApi } = useReplyEmail();
	const [attachments, setAttachements] = useState([]);
	let actionToPerform = createEmail;
	let buttonText = 'Send Mail';
	if (action === 'reply') {
		actionToPerform = replyEmail;
		buttonText = 'Reply Mail';
	}
	if (action === 'reply_all') {
		actionToPerform = replyAllEmail;
		buttonText = 'Reply To All';
	}
	if (action === 'forward') {
		actionToPerform = forwardEmail;
		buttonText = 'Forward';
	}

	const sendMail = async (data) => {
		const payload = {
			sender       : COMPOSE_EMAIL,
			toUserEmail  : userEmailArray,
			ccrecipients : ccEmailArray,
			subject      : data?.subject,
			content,
			attachments  : attachments.map((item) => item),
			msgId        : composingEmail?.id || undefined,
			userId,
			onCreate,
		};
		await actionToPerform(payload);
	};
	const loading =	replyAllMailApi.loading
		|| mailApi.loading
		|| forwardMailApi.loading
		|| replyMailApi.loading;

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>

				<Attachement
					attachments={attachments}
					onChange={setAttachements}
				/>

				<Button
					className="primary lg"
					onClick={handleSubmit(sendMail, onError)}
					disabled={loading}
				>
					{!loading ? buttonText : `${buttonText}...`}
				</Button>
			</div>
		</div>
	);
}

export default Footer;
