import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function Header({ setSwitchDashboard = () => {} }) {
	const router = useRouter();

	const onClickConfiguration = () => {
		router.push(
			'/learning/faq/create/configuration',
			'/learning/faq/create/configuration',
		);
	};

	const onClickUpload = () => {
		router.push(
			'/learning/faq/create/upload?type=questions',
			'/learning/faq/create/upload?type=questions',
		);
	};

	const onClickQuestion = () => {
		router.push(
			'/learning/faq/create/question',
			'/learning/faq/create/question',
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>Manage FAQs</div>

			<div className={styles.button_container}>
				<Button
					type="button"
					style={{ marginLeft: 8 }}
					themeType="secondary"
					onClick={() => setSwitchDashboard(false)}
				>
					Analytics
				</Button>
				<Button type="button" style={{ marginLeft: 8 }} themeType="secondary" onClick={onClickConfiguration}>
					Configuration
				</Button>

				<Button type="button" style={{ marginLeft: 8 }} onClick={onClickUpload}>
					Upload in Bulk
				</Button>

				<Button type="button" style={{ marginLeft: 8 }} onClick={onClickQuestion}>
					Add Question
				</Button>
			</div>
		</div>
	);
}

export default Header;
