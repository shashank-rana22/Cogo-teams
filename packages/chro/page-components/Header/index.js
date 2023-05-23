import { Input } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Header({ search, setSearch }) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				CHRO&#39;s Approval Dashboard
			</div>

			<Input
				value={search}
				onChange={setSearch}
				size="md"
				style={{ width: 300, height: 40 }}
				placeholder="Search via Name or Email"
			/>
		</div>
	);
}

export default Header;
