import { cl } from '@cogoport/components';
import React from 'react';

import EditCancelService from '../../../../EditCancelService';

import styles from './styles.module.css';

function Header({
	state = '',
	heading = '',
	service_provider = {},

}) {
	return (
		<div className={cl`${state} ${styles.container}`}>
			<div className={styles.heading_content}>
				<div className={cl`${styles.heading} ${state}`}>{heading}</div>

				<EditCancelService state={state} />
			</div>
			<div className={cl`${styles.sub_heading} ${state}`}>
				{service_provider?.business_name}
			</div>

		</div>

	);
}

export default Header;
