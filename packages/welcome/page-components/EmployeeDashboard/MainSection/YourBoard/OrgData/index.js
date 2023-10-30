import { cl } from '@cogoport/components';
import React from 'react';

import Loader from '../../../../../common/Loader';

import styles from './styles.module.css';

function OrgData({ manager_name = '', hrbp_name = '', loading = false }) {
	if (loading) {
		return (
			<div className={styles.container}>
				<Loader height="20px" count={3} />
			</div>
		);
	}
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Have a concern? Reach out to 📢
			</div>
			<div className={styles.summary}>
				<div className={cl`${styles.avg_data} ${styles.mr_30}`}>
					<div className={styles.avg_summary}>
						{manager_name}
					</div>
					Manager
				</div>
				<div className={styles.avg_data}>
					<div className={styles.avg_summary}>
						{hrbp_name}
					</div>
					HRBP
				</div>
			</div>
		</div>
	);
}

export default OrgData;
