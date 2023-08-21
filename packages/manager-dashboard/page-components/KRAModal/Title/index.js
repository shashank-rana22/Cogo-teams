import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

function Title({ data = {}, list = [] }) {
	const { t } = useTranslation(['managerDashboard']);

	const { employee_details } = data || {};

	return (
		<div className={styles.container}>
			<div className={styles.employee_name}>
				{t('managerDashboard:employee_name')}
				{' '}
				<span className={styles.history_item}>
					{employee_details?.employee_name}
				</span>
			</div>

			<div className={styles.squad}>
				<div className={styles.squad_name}>
					{t('managerDashboard:squad')}
					{' '}
					<span className={styles.history_item}>
						{employee_details?.squad_name}
					</span>
				</div>

				<div className={styles.squad_name}>
					{t('managerDashboard:tribe')}
					{' '}
					<span className={styles.history_item}>
						{employee_details?.squad_name}
					</span>
				</div>

				<div className={styles.squad_name}>
					{t('managerDashboard:total_kra')}
					{' '}
					<span className={styles.history_item}>{(list || [])?.length}</span>
				</div>
			</div>
		</div>
	);
}

export default Title;
