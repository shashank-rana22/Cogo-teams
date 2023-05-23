import { Button, Input } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function Header({ search, setSearch }) {
	const router = useRouter();

	const onClickAddNewJoinee = () => {
		const href = '/new-employee-dashboard/add';
		router.push(href, href);
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>New Employee Dashboard</div>

			<div className={styles.button_container}>
				<Input
					value={search}
					onChange={setSearch}
					size="md"
					style={{ marginRight: '8px', width: 300, height: 40 }}
					placeholder="Search via Name or Email"
				/>

				<Button type="button" size="lg" onClick={onClickAddNewJoinee}>Add new joinee</Button>
			</div>
		</div>
	);
}

export default Header;
