import { Tooltip } from '@cogoport/components';
import React from 'react';

import { MAIL_REPLY_TYPE } from '../../../../../constants';

import styles from './styles.module.css';

function Header({ subject = '' }) {
	return (
		<div className={styles.header_container}>
			<div className={styles.header_subject}>
				{subject}
			</div>
			<div className={styles.header_actions}>
				{MAIL_REPLY_TYPE.map(({ label, icon }) => (
					<Tooltip
						content={label}
						placement="top"
						caret={false}
					>
						<div className={styles.header_actions_reply}>
							{icon}
						</div>
					</Tooltip>
				))}
			</div>
		</div>
	);
}

export default Header;
