import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function Header() {
	const router = useRouter();

	return (
		<div className={styles.header}>
			<h2>Handling Fees Configuration</h2>
			<Button size="lg" onClick={() => router.push('/handling-fees/create')}>
				+ Create Handling Fees
			</Button>
		</div>
	);
}

export default Header;
