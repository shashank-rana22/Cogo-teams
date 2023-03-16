import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function Header() {
	const router = useRouter();
	return (
		<div className={styles.flex_div}>
			<div className={styles.title}>Test Module</div>
			<Button onClick={() => router.push('/test-module/create')}>+ Create New Test</Button>
		</div>
	);
}

export default Header;
