import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import MailRecipientType from '../../../../../../common/MailRecipientType';

import styles from './styles.module.css';

const EMAIL_RECIPIENTS = [
	{
		label : 'To',
		value : 'toUserEmail',
	},
	{
		label : 'Cc',
		value : 'ccrecipients',
	},
	{
		label : 'Bcc',
		value : 'bccrecipients',
	},
];

function Recipients({
	emailState = {},
	handleChange = () => {},
	handleDelete = () => {},
	handleKeyPress = () => {},
	handleError = () => {},
	handleEdit = () => {},
	setEmailState = () => {},
	showControl = '',
	value = '',
	errorValue = '',
}) {
	const [enabledRecipients, setEnabledRecipients] = useState({
		ccrecipients  : !isEmpty(emailState?.ccrecipients),
		bccrecipients : !isEmpty(emailState?.bccrecipients),
	});

	const handleRemove = (itm) => {
		setEnabledRecipients((prev) => (
			{ ...prev, [itm.value]: false }
		));
		setEmailState((prev) => ({ ...prev, [itm.value]: [] }));
	};

	return (
		<div className={styles.container}>
			{EMAIL_RECIPIENTS.map((itm) => {
				if (itm.value !== 'toUserEmail' && !enabledRecipients?.[itm.value]) {
					return null;
				}

				return (
					<div
						className={styles.type_to}
						key={itm.value}
					>
						<div className={styles.mail_recipient_container}>
							<div className={styles.sub_text}>
								{itm.label}
								:
							</div>
							<MailRecipientType
								emailRecipientType={emailState?.[itm.value]}
								handleDelete={handleDelete}
								showControl={showControl}
								type={itm.value}
								value={value}
								errorValue={errorValue}
								handleChange={handleChange}
								handleKeyPress={handleKeyPress}
								handleError={handleError}
								handleEdit={handleEdit}
							/>
						</div>
						<div className={styles.button_styles}>
							{itm.value === 'toUserEmail' ? (
								<>
									{!enabledRecipients?.ccrecipients && (
										<Button
											size="md"
											themeType="linkUi"
											onClick={() => setEnabledRecipients((prev) => (
												{ ...prev, ccrecipients: true }
											))}
										>
											Cc
										</Button>
									)}
									{!enabledRecipients?.bccrecipients && (
										<Button
											size="md"
											themeType="linkUi"
											onClick={() => setEnabledRecipients((prev) => (
												{ ...prev, bccrecipients: true }
											))}
										>
											Bcc
										</Button>
									)}
								</>
							) : (
								<Button
									size="md"
									themeType="linkUi"
									onClick={() => handleRemove(itm)}
								>
									Remove
								</Button>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Recipients;
