import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function Header() {
	const router = useRouter();

	const onClickCreate = () => {
		router.push(
			'/learning/course/create',
			'/learning/course/create',
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>Course</div>

			<div className={styles.button_container}>
				<Button
					type="button"
					style={{ marginLeft: 8 }}
					themeType="primary"
					onClick={onClickCreate}
				>
					Create Course
				</Button>
			</div>

		</div>
	);
}

export default Header;
