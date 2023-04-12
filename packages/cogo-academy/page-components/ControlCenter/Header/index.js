import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function Header() {
	const router = useRouter();

	const onClickConfiguration = () => {
		router.push(
			'/learning/faq/create/configuration',
			'/learning/faq/create/configuration',
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>Control Center</div>

			<div className={styles.button_container}>

				<Button
					type="button"
					style={{ marginLeft: 8 }}
					themeType="secondary"
					onClick={onClickConfiguration}
				>
					Configuration
				</Button>
			</div>

		</div>
	);
}

export default Header;
