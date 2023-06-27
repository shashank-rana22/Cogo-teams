import React from 'react';

import styles from './styles.module.css';

function Header({ data }) {
	return (
		<div className={styles.container}>

			<div className={styles.title1}>Hello, Bhaskar Priyadarshi</div>

			<div className={styles.target_remains_ctn}>
				Manual Targets Remaining :
				{' '}
				{data?.remaining_unasssigned_targets}
			</div>

		</div>
	);
}

export default Header;
