import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function Header() {
	const router = useRouter();

	const onClickAddNewJoinee = () => {
		const href = '/new-employee-dashboard/add';
		router.push(href, href);
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>New Employee Dashboard</div>

			<Button type="button" onClick={onClickAddNewJoinee}>Add new joinee</Button>
		</div>
	);
}

export default Header;
