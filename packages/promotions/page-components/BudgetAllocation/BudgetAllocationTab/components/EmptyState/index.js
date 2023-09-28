import { Image } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function EmptyState() {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<h4>No records found</h4>
				<p>
					Looks like you do not have any records for this section
				</p>
			</div>
			<div className={styles.iccontainer}>
				<Image
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-empty-nonfunded.svg"
					alt="empty"
					height="300"
					width="300"
					style={{ marginLeft: 20 }}
				/>
			</div>
		</div>
	);
}
export default EmptyState;
