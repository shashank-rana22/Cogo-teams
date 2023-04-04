import { Button } from '@cogoport/components';
import React from 'react';

import Attachements from './Attachements';
import AttachementsUrl from './AttachementsUrl';
import EmailTop from './EmailTop';
import styles from './styles.module.css';

function Thread({ content, emailData, onAction, allAttachements }) {
	const externalAttachements = allAttachements.filter((att) => !att.isInline);
	const cc = emailData?.ccRecipients || [];
	const to = emailData?.toRecipients || [];
	const isFromRpa = emailData?.isFromRpa;
	const combinedLength = cc.length + to.length + 1;
	const from = emailData?.from;
	const showReply = !!from && !isFromRpa;
	const showReplyAll = combinedLength > 1 && !isFromRpa;

	console.log(isFromRpa, 'isFromRpa');

	return (
		<div className={styles.container}>

			<EmailTop data={emailData || {}} />

			{isFromRpa ? (
				<AttachementsUrl externalAttachements={emailData?.file_url || []} />
			) : (
				<Attachements externalAttachements={externalAttachements} />
			)}

			<div
				className={styles.email_container}
				dangerouslySetInnerHTML={{ __html: content }}
			/>

			<div className={styles.footer}>
				<div className={styles.button_div}>
					{showReplyAll ? (
						<Button
							className="secondary md"
							style={{ marginRight: 10 }}
							onClick={() => onAction(emailData, 'reply_all')}
						>
							Reply All
						</Button>
					) : null}

					{showReply ? (
						<Button
							className="secondary md"
							style={{ marginRight: 10 }}
							onClick={() => onAction(emailData, 'reply')}
						>
							Reply
						</Button>
					) : null}

					<Button
						className="secondary md"
						onClick={() => onAction(emailData, 'forward')}
					>
						Forward
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Thread;
