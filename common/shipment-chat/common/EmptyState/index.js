import React from 'react';

import styles from './styles.module.css';

function EmptyState({
	isMobile = false,
	showContent = {
		heading     : 'No Results Found!',
		description : 'Looks like you do not have any records for this section',
	},
}) {
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.heading}>{showContent.heading}</div>

				<div className={styles.content}>{showContent.description}</div>
			</div>

			{!isMobile ? (
				<div
					className="empty-state-icon"
					style={{ marginLeft: '20px', width: '100', height: '100' }}
				>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-empty-nonfunded.svg"
						alt="empty-state"
						style={{ width: '120px', height: '120px' }}
					/>
				</div>
			) : null}
		</div>
	);
}

export default EmptyState;
