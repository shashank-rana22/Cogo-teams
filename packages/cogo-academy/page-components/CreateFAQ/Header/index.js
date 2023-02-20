import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function Header() {
	const router = useRouter();

	const onClickConfiguration = () => {
		router.push('/learning/faq/create/configuration', '/learning/faq/create/configuration');
	};

	return (
		<div className={styles.container}>
			<div>Manage FAQs</div>

			<div className={styles.buttonContainer}>
				<Button themeType="secondary" onClick={onClickConfiguration}>
					Configuration
				</Button>
				<Button style={{ marginLeft: 8 }}>
					Upload in bulk
				</Button>
			</div>

		</div>

	);
}

export default Header;
