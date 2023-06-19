import { IcMArrowDown } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function SelectedOrgInfo({ org_name, user_name }) {
	return (
		<div className={styles.container}>
			<div className={styles.name_container}>
				<div className={styles.org_name}>{org_name || ''}</div>
				<div className={styles.user_name}>{user_name || ''}</div>
			</div>

			<div className={styles.icon}>
				<IcMArrowDown height={15} width={15} />
			</div>
		</div>
	);
}

export default SelectedOrgInfo;
