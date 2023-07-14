import React from 'react';

import styles from './styles.module.css';

const NoDataImage = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-empty-doc.svg';

function EmptyState({ text = 'No Invoices Found' }) {
	return (
		<div className={styles.container}>
			<img
				className={styles.img_height}
				src={NoDataImage}
				alt="No Data"
			/>
			<div>{text}</div>
		</div>
	);
}
export default EmptyState;
