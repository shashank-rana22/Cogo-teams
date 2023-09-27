import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import MailRecipientType from '../../../../../../../common/MailRecipientType';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../../../../constants/viewTypeMapping';

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
	{
		label : 'Bcc',
		value : 'bccrecipients',
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
	mailProps = {},
	orgId = '',
	setOrgId = () => {},
}) {
	const {
		buttonType = '',
		viewType = '',
	} = mailProps;

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

	const restrictMailToOrganizations = (
		VIEW_TYPE_GLOBAL_MAPPING?.[viewType]?.permissions?.restrict_mail_to_organizations || false
	);

	const showOrgRecipients = buttonType === 'send_mail' && restrictMailToOrganizations;

	return (
		<div className={styles.container}>
			{EMAIL_RECIPIENTS.map((itm) => {
				if (itm.value !== 'toUserEmail' && !enabledRecipients?.[itm.value]) {
					return null;
				}

				const ActiveRecipientComp = ACTIVE_RECIPIENTS_COMP?.[showOrgRecipients ? 'specific' : 'default'];

				return (
					<div
						className={styles.type_to}
						key={itm.value}
						style={{ borderBottom: showOrgRecipients ? 'unset' : '1px solid #e0e0e0' }}
					>
						<div className={styles.mail_recipient_container}>
							<div className={styles.sub_text}>
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
								setOrgId={setOrgId}
								orgId={orgId}
								setEmailState={setEmailState}
								recipientTypes={EMAIL_RECIPIENTS}
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
