import { Input, Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCross } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import styles from './styles.module.css';

function MultiEmailInput({
	id = '',
	setError = () => {},
	value = [],
	onChange = () => {},
	placeholder = '',
	onBlurRequired = true,
	...rest
}) {
	const [emails, setEmails] = useState(value);

	useEffect(() => {
		if (value !== emails) {
			setEmails(value);
		}
	}, [emails, value]);

	const isValidEmail = (email = '') => email.match(GLOBAL_CONSTANTS.regex_patterns.email);

	const deleteEmail = (email) => {
		const newEmails = emails.filter((item) => item !== email);
		setEmails(newEmails);
		onChange(newEmails);
	};

	const onSetEmail = (email, e) => {
		const newEmails = [...emails, email];
		setEmails(newEmails);
		onChange(newEmails);
		e.target.value = '';
	};

	const onTextChange = (e) => {
		setError(false);
		const tokens = e.target.value.split(' ');
		if (tokens.length > GLOBAL_CONSTANTS.one) {
			const email = tokens.filter((x) => x)?.[GLOBAL_CONSTANTS.zeroth_index];
			if (isValidEmail(email)) {
				onSetEmail(email, e);
			}
		}
	};

	const onTextBlur = (e) => {
		if (onBlurRequired) {
			const email = e.target.value;
			if (email.length > GLOBAL_CONSTANTS.one) {
				if (isValidEmail(email)) {
					onSetEmail(email, e);
				} else {
					Toast.error('Please enter valid email address');
					e.target.value = '';
				}
			}
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.email_input}>
				{(emails || []).map((email) => (
					<p
						className={styles.email}
						key={email}
					>
						{email}
						{' '}
						<IcMCross
							className={styles.cross_icon}
							onClick={() => deleteEmail(email)}
							width="10px"
							height="10px"
							style={{ margin: '0px 5px' }}
						/>
					</p>
				))}
				<Input
					{...rest}
					className={styles.styled_input}
					placeholder={placeholder || 'Add Email'}
					id={id}
					onChange={onTextChange}
					onBlur={onTextBlur}
				/>
			</div>
		</div>
	);
}

export default MultiEmailInput;
