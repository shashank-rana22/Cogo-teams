import { cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Info({ title = '', status = '', statusName = '' }) {
	return (
		<div className={styles.upselling_service_info_container}>
			<div className={cl`${styles[status]} ${styles.tag}`}>{statusName}</div>
			<div className={styles.item_name}>{title}</div>
		</div>
	);
}

export default Info;
