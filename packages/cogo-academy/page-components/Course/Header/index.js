import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function Header() {
	const router = useRouter();

	const onClickConfiguration = () => {
		router.push(
			'/learning/course/',
			'/learning/course/',
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
					onClick={onClickConfiguration}
				>
					Create New
				</Button>
			</div>

		</div>
	);
}

export default Header;
