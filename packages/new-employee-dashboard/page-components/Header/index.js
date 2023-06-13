import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function Header() {
	const router = useRouter();

	const onClickAddNewJoinee = () => {
		const HREF = '/new-employee-dashboard/add';
		router.push(HREF, HREF);
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>New Employee Dashboard</div>

			<div className={styles.button_container}>
				<Button type="button" size="lg" onClick={onClickAddNewJoinee}>Add new joinee</Button>
			</div>
		</div>
	);
}

export default Header;
