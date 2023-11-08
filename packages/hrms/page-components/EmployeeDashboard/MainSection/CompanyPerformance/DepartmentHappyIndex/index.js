import { IcMArrowRight } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function DepartmentHappyIndex() {
	return (
		<div className={styles.employee_data}>
			<div className={styles.employee_abs}>
				<div className={styles.employee_abs_title}>
					Department Happiness Index
				</div>
				<div className={styles.employee_tot_count}>
					Good
				</div>
				<div className={styles.employee_abs_img}>
					<img
						alt="kpi-img"
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Face.png"
					/>
				</div>
				<div className={styles.view_abs_flex}>
					View Absents
					{' '}
					<IcMArrowRight width={12} height={12} style={{ marginLeft: 2 }} />
				</div>
			</div>
		</div>
	);
}

export default DepartmentHappyIndex;
