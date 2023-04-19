import { cl } from '@cogoport/components';
import React from 'react';

import EditCancelService from '../../../../EditCancelService';

import styles from './styles.module.css';

function Header({ serviceData }) {
	const { state, display_label, service_provider } = serviceData || {};

	return (
		<div className={cl`${state} ${styles.container}`}>
			<div className={styles.heading_content}>
				<div className={cl`${styles.heading} ${state}`}>{display_label}</div>

				<EditCancelService serviceData={serviceData} />
			</div>
			<div className={cl`${styles.sub_heading} ${state}`}>
				{service_provider?.business_name}
			</div>

		</div>

	);
}

export default Header;
