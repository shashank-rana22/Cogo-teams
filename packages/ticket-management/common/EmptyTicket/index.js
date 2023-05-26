import { cl } from '@cogoport/components';
import { IcMTaskNotCompleted } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function EmptyTicket({
	listType = '',
	emptyText = 'No Tickets Raised',
}) {
	return (
		<div
			className={cl`${styles.container} ${listType === 'create' ? styles.create_raise_box : ''}`}
		>
			<IcMTaskNotCompleted className={styles.icm_tag} />
			<div className={styles.ticket_label}>{emptyText}</div>
		</div>
	);
}

export default EmptyTicket;
