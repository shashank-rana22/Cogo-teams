import React from 'react';

import styles from './styles.module.css';

const SRC = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-empty-doc.svg';
function EmptyState() {
	return (
		<div className={styles.container}>
			<h3>NO MARGINS PRESENT !!!</h3>
			<img
				src={SRC}
				alt="empty"
				width={150}
				height={150}
			/>
		</div>
	);
}

export default EmptyState;
