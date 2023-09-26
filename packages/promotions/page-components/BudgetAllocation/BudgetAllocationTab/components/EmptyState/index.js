import React from 'react';

import styles from './styles.module.css';

function EmptyState() {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<h4 className={styles.heading}>No records found</h4>
				<p className={styles.content}>
					Looks like you do not have any records for this section
				</p>
			</div>
			<div className={styles.iccontainer}>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-empty-nonfunded.svg"
					alt="empty"
					height="100%"
					width="100%"
					style={{ marginLeft: 20 }}
				/>
			</div>
		</div>
	);
}

EmptyState.propTypes = {};

export default EmptyState;
