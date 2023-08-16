import {
	IcMFtaskCompleted, IcMLiveChat,
} from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function HeaderTitle({ isManager }) {
	if (isManager) {
		return (
			<div className={styles.header}>
				<IcMLiveChat width={24} height={24} />
				My Inbox
			</div>
		);
	}
	return (
		<div className={styles.header}>
			<IcMFtaskCompleted width={24} height={24} />
			My Requests(2)
		</div>
	);
}

export default HeaderTitle;
