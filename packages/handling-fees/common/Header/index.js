import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function Header({ activeService = 'fcl_freight' }) {
	const router = useRouter();

	return (
		<div className={styles.header}>
			<h2>Handling Fees Configuration</h2>
			<Button size="lg" onClick={() => router.push(`/handling-fees/create?service=${activeService}`)}>
				+ Create Handling Fees
			</Button>
		</div>
	);
}

export default Header;
