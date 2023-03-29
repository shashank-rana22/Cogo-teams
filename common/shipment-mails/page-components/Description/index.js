import { cl } from '@cogoport/components';
import React from 'react';

import Compose from './Compose';
import EmailView from './EmailView';
import styles from './styles.module.css';

function Description({
	setComposingEmail,
	composingEmail,
	activeMail,
	RECIEVE_EMAIL,
	COMPOSE_EMAIL,
	onAction,
	action,
	pre_subject_text,
	subject_position,
	showClassifyAction,
}) {
	if (composingEmail) {
		return (
			<div className={styles.container}>
				<Compose
					composingEmail={composingEmail}
					setComposingEmail={setComposingEmail}
					COMPOSE_EMAIL={COMPOSE_EMAIL}
					action={action}
					pre_subject_text={pre_subject_text}
					subject_position={subject_position}
				/>
			</div>
		);
	}
	if (activeMail) {
		return (
			<div className={cl`${styles.container} ${styles.email_view}`}>
				<EmailView
					activeMail={activeMail}
					RECIEVE_EMAIL={RECIEVE_EMAIL}
					onAction={onAction}
					showClassifyAction={showClassifyAction}
				/>
			</div>
		);
	}
	return <p style={{ marginLeft: 10 }}>Click on a mail to see full details</p>;
}

export default Description;
