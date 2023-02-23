import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.container}>
			<div className={styles.config_basic_details}>
				Currently Editing:
				{' '}
				<b>saved draft</b>
			</div>

			<div className={styles.button_container}>
				<Button themeType="secondary">
					Save As Draft
				</Button>

				<Button themeType="primary" style={{ marginLeft: '8px' }}>
					Publish
				</Button>

			</div>

		</div>
	);
}

export default Header;
