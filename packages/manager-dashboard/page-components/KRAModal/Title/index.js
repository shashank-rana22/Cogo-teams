import React from 'react';

import styles from './styles.module.css';

function Title({ data, list }) {
	const { employee_details } = data || {};
	return (
		<div className={styles.container}>
			<div className={styles.employee_name}>
				Employee Name :
				{' '}
				<span className={styles.history_item}>
					{employee_details?.employee_name}
				</span>
			</div>

			<div className={styles.squad}>
				<div className={styles.squad_name}>
					Squad:
					{' '}
					<span className={styles.history_item}>
						{employee_details?.squad_name}
					</span>
				</div>

				<div className={styles.squad_name}>
					Tribe:
					{' '}
					<span className={styles.history_item}>
						{employee_details?.squad_name}
					</span>
				</div>

				<div className={styles.squad_name}>
					{'Total Kra: '}
					<span className={styles.history_item}>{(list || [])?.length}</span>
				</div>
			</div>
		</div>
	);
}

export default Title;
