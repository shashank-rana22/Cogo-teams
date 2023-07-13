import { Placeholder, Tooltip } from '@cogoport/components';
import React from 'react';

import { MAIL_REPLY_TYPE } from '../../../../../constants';

import styles from './styles.module.css';
import useHandleReplyMail from './useHandleReplyMail';

function Header({
	subject = '',
	loading = false,
	setButtonType = () => {},
	setEmailState = () => {},
	senderAddress = '',
	recipientData = [],
	ccData = [],
	bccData = [],
	activeMailAddress = '',
}) {
	const { handleClick = () => {} } = useHandleReplyMail({
		setButtonType,
		setEmailState,
		senderAddress,
		recipientData,
		ccData,
		bccData,
		activeMailAddress,
	});

	return (
		<div className={styles.header_container}>
			<div className={styles.header_subject}>
				{loading
					? <Placeholder width="300px" height="24px" />
					: subject}
			</div>
			<div className={styles.header_actions}>
				{MAIL_REPLY_TYPE.map(
					({ label, icon, value }) => (
						<Tooltip
							content={label}
							placement="top"
							caret={false}
							key={value}
						>
							<div
								role="presentation"
								className={styles.header_actions_reply}
								onClick={() => handleClick(value)}
							>
								{icon}
							</div>
						</Tooltip>
					),
				)}
			</div>
		</div>
	);
}

export default Header;
