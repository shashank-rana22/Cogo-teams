import { IcMTaskNotCompleted } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

function EmptyTicket({
	emptyText = '',
}) {
	const { t } = useTranslation(['myTickets']);

	return (
		<div className={styles.container}>
			<IcMTaskNotCompleted className={styles.icm_tag} />
			<div className={styles.ticket_label}>{emptyText || t('myTickets:no_tickets_raised')}</div>
		</div>
	);
}

export default EmptyTicket;
