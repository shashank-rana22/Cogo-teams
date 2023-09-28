import { cl } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function SalaryUpdate() {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Have a concern? Reach out to 📢
			</div>
			<div className={styles.summary}>
				<div className={cl`${styles.avg_data} ${styles.mr_30}`}>
					<div className={styles.avg_summary}>
						Ankur Verma
					</div>
					Manager
				</div>
				<div className={styles.avg_data}>
					<div className={styles.avg_summary}>
						Mukti Shetty
					</div>
					HRBP
				</div>
			</div>
			<div className={styles.footer}>
				<div className={styles.view_org}>
					View Organization Chart
					{' '}
					<IcMArrowRight style={{ marginLeft: 8 }} />
				</div>
			</div>
		</div>
	);
}

export default SalaryUpdate;
