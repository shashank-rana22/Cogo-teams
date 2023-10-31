import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import { cogoportMails } from '../../../../../../../utils/getAllowedEmailsList';

import MailRecipientType from './MailRecipientType';
import OrgSpecificRecipients from './OrgSpecificRecipients';
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
];

const ACTIVE_RECIPIENTS_COMP = {
	specific : OrgSpecificRecipients,
	default  : MailRecipientType,
};

function Recipients({
	emailState = {},
	handleChange = () => {},
	handleDelete = () => {},
	handleKeyPress = () => {},
	handleCancel = () => {},
	handleEdit = () => {},
	setEmailState = () => {},
	showControl = '',
	errorValue = '',
	showOrgSpecificMail = false,
	hideFromMail = false,
	viewType = '',
	restrictMailToSingle = false,
	restrictMailToOrganizations = false,
	buttonType = '',
	firestore = {},
}) {
	const [enabledRecipients, setEnabledRecipients] = useState({
		ccrecipients  : !isEmpty(emailState?.ccrecipients),
		bccrecipients : !isEmpty(emailState?.bccrecipients),
	});

	const [internalEmails, setInternalEmails] = useState([]);

	const handleRemove = (itm) => {
		setEnabledRecipients((prev) => (
			{ ...prev, [itm.value]: false }
		));
		setEmailState((prev) => ({ ...prev, [itm.value]: [] }));
	};

	const restrictForward = restrictMailToOrganizations && buttonType === 'forward';

	useEffect(() => {
		(async () => {
			const mails = await cogoportMails({ firestore, viewType }) || [];
			const modifiedData = mails?.map((itm) => ({ ...itm, tag: 'internal' })) || [];

			setInternalEmails(modifiedData);
		})();
	}, [firestore, viewType]);

	return (
		<div className={styles.container}>
			{EMAIL_RECIPIENTS.map((itm) => {
				if (itm.value !== 'toUserEmail' && !enabledRecipients?.[itm.value]) {
					return null;
				}

				const ActiveRecipientComp = ACTIVE_RECIPIENTS_COMP?.[
					(showOrgSpecificMail || (restrictMailToSingle && itm.value !== 'toUserEmail') || restrictForward)
						? 'specific' : 'default'
				];

				return (
					<div
						className={styles.type_to}
						key={itm.value}
						style={{ borderBottom: showOrgSpecificMail ? 'unset' : '1px solid #e0e0e0' }}
					>
						<div className={styles.mail_recipient_container}>
							<div
								className={styles.sub_text}
								style={{ width: hideFromMail ? '30px' : '40px' }}
							>
								{itm.label}
								:
							</div>

							<ActiveRecipientComp
								emailRecipientType={emailState?.[itm.value]}
								handleDelete={handleDelete}
								showControl={showControl}
								type={itm.value}
								errorValue={errorValue}
								handleChange={handleChange}
								handleKeyPress={handleKeyPress}
								handleCancel={handleCancel}
								handleEdit={handleEdit}
								emailState={emailState}
								setEmailState={setEmailState}
								recipientTypes={EMAIL_RECIPIENTS}
								viewType={viewType}
								restrictMailToSingle={restrictMailToSingle}
								restrictMailToOrganizations={restrictMailToOrganizations}
								restrictForward={restrictForward}
								internalEmails={internalEmails}
							/>
						</div>

						<div className={styles.button_styles}>
							{itm.value === 'toUserEmail' ? (
								<div>
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
								</div>
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
