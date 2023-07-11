import React from 'react';

import MailRecipientType from '../../../../../../common/MailRecipientType';

import styles from './styles.module.css';

function Recipients({
	emailState = {},
	handleChange = () => {},
	handleDelete = () => {},
	handleKeyPress = () => {},
	handleError = () => {},
	handleEdit = () => {},
	showControl = '',
	value = '',
	errorValue = '',
}) {
	return (
		<div className={styles.container}>
			<div className={styles.type_to}>
				<div className={styles.sub_text}>
					To:
				</div>
				<MailRecipientType
					emailRecipientType={emailState?.toUserEmail}
					handleDelete={handleDelete}
					showControl={showControl}
					type="toUserEmail"
					value={value}
					errorValue={errorValue}
					handleChange={handleChange}
					handleKeyPress={handleKeyPress}
					handleError={handleError}
					handleEdit={handleEdit}
				/>
			</div>
			<div className={styles.type_to}>
				<div className={styles.sub_text}>
					Cc:
				</div>
				<MailRecipientType
					emailRecipientType={emailState?.ccrecipients}
					handleDelete={handleDelete}
					showControl={showControl}
					type="ccrecipients"
					value={value}
					errorValue={errorValue}
					handleChange={handleChange}
					handleKeyPress={handleKeyPress}
					handleError={handleError}
					handleEdit={handleEdit}
				/>
			</div>
		</div>
	);
}

export default Recipients;
