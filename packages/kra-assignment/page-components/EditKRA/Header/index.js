import React from 'react';

import styles from './styles.module.css';

function Header({ data }) {
	return (
		<div className={styles.container}>
			<div className={styles.title1}>Hello Bhaskar Priyadarshi</div>
			<div className={styles.target_remains_ctn}>
				<div>
					Manual Tagets Remaining :
					{data?.remaining_unassigned_target || '6'}
				</div>
			</div>
		</div>
	);
}

export default Header;
