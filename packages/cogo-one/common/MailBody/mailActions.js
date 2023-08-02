import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import { BUTTON_MAPPING } from '../../constants/mailConstants';

import styles from './styles.module.css';

const NULL_SUBJECT_LENGTH = 0;
const MAXIMUM_ALLOWED_SUBJECT_LENGTH = 250;

const EMAIL_SUBJECT_PREFIX_MAPPING = {
	reply   : 'RE',
	forward : 'FW',
};

function getSubject({ subject = '', val = '' }) {
	const formatedSubject = subject.replace(GLOBAL_CONSTANTS.regex_patterns.email_subject_prefix, '').trim();

	const emailPrefix = EMAIL_SUBJECT_PREFIX_MAPPING[val];

	return (formatedSubject?.length || NULL_SUBJECT_LENGTH) > MAXIMUM_ALLOWED_SUBJECT_LENGTH
		? subject : `${emailPrefix}: ${formatedSubject}`;
}

function MailActions({
	eachMessage = {},
	setMailActions = () => {},
}) {
	return (
		<div className={styles.buttons_flex}>
			{BUTTON_MAPPING.map((eachButton) => {
				const { buttonName, icon: Icon, key } = eachButton || {};

				return (
					<Button
						key={key}
						themeType="secondary"
						size="sm"
						className={styles.styled_button}
						onClick={() => setMailActions({
							actionType : key,
							data       : {
								...eachMessage,
								response: {
									...eachMessage?.response,
									subject: getSubject(
										{
											subject : eachMessage?.response?.subject,
											val     : key,
										},
									),
								},
							},

						})}
					>
						<Icon className={styles.icon} />
						<div className={styles.button_text}>
							{buttonName}
						</div>
					</Button>
				);
			})}
		</div>
	);
}

export default MailActions;
