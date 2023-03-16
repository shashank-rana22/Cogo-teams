import React from 'react';

import styles from './styles.module.css';

function Info({ title = '', status = '', statusName = '' }) {
	return (
		<iv>
			<Tag className={status}>{statusName}</Tag>
			<div className={styles.item_name}>{title}</div>
		</iv>
	);
}

export default Info;
