import React from 'react';

import styles from './styles.module.css';

function Poster() {
	return (
		<div className={styles.container}>
			<div className={styles.left_section}>
				<div className={styles.heading_text}>
					Now you can appreciate each other,
					and share the success 👏
				</div>
				<div className={styles.sub_title}>
					Thank your colleagues for their amazing work
				</div>
			</div>
			<img alt="img" src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/appr.png" />
		</div>
	);
}

export default Poster;
