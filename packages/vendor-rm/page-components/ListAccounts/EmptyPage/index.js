// import React from 'react';
import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function EmptyPage() {
	const router = useRouter();

	const redirectHandler = () => {
		router.push('/add-account/', '/add-account/');
	};

	return (
		<div>
			<div className={styles.header}>Vendor Relationship Management</div>
			<div className={styles.center}>
				<p className={styles.text}>
					There is no active vendor right now,
					please start with adding a new vendor.
				</p>
				<Button size="lg" themeType="accent" onClick={() => redirectHandler()}>Add New Vendor</Button>
			</div>
		</div>
	);
}

export default EmptyPage;
