import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';
import Analytics from '../Analytics';
import styles from './styles.module.css';

function Header() {
	const router = useRouter();

	const onClickAnalytics = () => {
		return <Analytics/>
	}

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
			<div>Manage FAQs</div>

			<div className={styles.button_container}>
			<Button themeType="secondary" onClick={onClickAnalytics} >
					Analytics
				</Button>
				<Button style={{ marginLeft: 8 }} themeType="secondary" onClick={onClickConfiguration}>
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
