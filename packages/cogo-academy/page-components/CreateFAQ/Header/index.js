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

	const onClickTestModule = () => {
		router.push(
			'/learning/faq/create/test-module',
			'/learning/faq/create/test-module',
		);
	};

	return (
		<div className={styles.container}>
			<div>Manage FAQs</div>

			<div className={styles.button_container}>
				<Button themeType="secondary" onClick={onClickTestModule}>
					Test Module
				</Button>

				<Button themeType="secondary" onClick={onClickConfiguration}>
					Configuration
				</Button>

				<Button style={{ marginLeft: 8 }} onClick={onClickUpload}>
					Upload in Bulk
				</Button>

				<Button style={{ marginLeft: 8 }} onClick={onClickQuestion}>
					Add Question
				</Button>
			</div>
		</div>
	);
}

export default Header;
