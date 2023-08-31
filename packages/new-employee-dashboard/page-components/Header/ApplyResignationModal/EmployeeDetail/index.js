import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';
import useEmployeeDetail from './useEmployeeDetail';

function EmployeeDetail() {
	const { KEYS_TO_DISPLAY } = useEmployeeDetail();

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Employee Details :</div>

			<div className={styles.item_container}>
				{Object.keys(KEYS_TO_DISPLAY || {}).map((val) => (
					<div className={styles.detail} key={val.key}>
						<div className={styles.label}>
							{startCase(val) || '-'}
						</div>

						<div className={styles.employee_detail}>
							{startCase(KEYS_TO_DISPLAY[val]) || '-'}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default EmployeeDetail;
