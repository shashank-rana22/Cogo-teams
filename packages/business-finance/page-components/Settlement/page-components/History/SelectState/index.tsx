import React from 'react';

import styles from './styles.module.css';

function SelectState() {
	return (
		<div className={styles.container}>
			<img src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/emptyState.svg" alt="img" />
			<div className={styles.container_div}>
				<div className={styles.text_div}>Please select a Business Partner</div>
				<div className={styles.hr} />
				<div className={styles.text_line}>
					Try adjusting filters to find what you’re looking for.
				</div>
			</div>
		</div>
	);
}

export default SelectState;
