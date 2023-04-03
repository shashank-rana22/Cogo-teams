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
	return (
		<div className={styles.empty_state}>
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/emai_empty_state.svg"
				alt="email"
				style={{ width: 300, height: 300 }}
			/>
			<div className={styles.heading}>Select an item to read</div>
			<div className={styles.text}>Nothing is selected</div>
		</div>
	);
}

export default Description;
