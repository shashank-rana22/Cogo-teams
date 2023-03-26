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
			<div className={styles.title}>Control Center</div>

			<div className={styles.button_container}>
				{/* <Button themeType="secondary" onClick={onClickTestModule}>
					Test Module
				</Button> */}

				<Button onClick={onClickConfiguration}>
					Configuration
				</Button>

				{/* <Button style={{ marginLeft: 8 }} onClick={onClickUpload}>
					Upload in Bulk
				</Button>

				<Button style={{ marginLeft: 8 }} onClick={onClickQuestion}>
					Add Question
				</Button> */}
			</div>
		</div>
	);
}

export default Header;
