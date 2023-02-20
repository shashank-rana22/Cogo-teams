import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.container}>
			<div>Manage FAQs</div>

			<div className={styles.buttonContainer}>
				<Button themeType="secondary">
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
