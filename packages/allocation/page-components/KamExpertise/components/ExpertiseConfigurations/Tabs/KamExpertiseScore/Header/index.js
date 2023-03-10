import { Button } from '@cogoport/components';
import { format, startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function Header({ auditData }) {
	const { name, updated_at } = auditData;
	return (
		<div className={styles.container}>
			<div className={styles.config_basic_details}>
				<div className={styles.draft_name}>
					Currently Editing :
					{' '}
				&nbsp;
					<b>Saved Draft</b>
				</div>

				<div className={styles.lower_details}>
					<div>
						Last Modified:
						{' '}
						{format(updated_at, 'dd-MM-YYYY')}
					</div>

					<div>
						Last Edit By:
						{' '}
						<b>{startCase(name)}</b>
					</div>
				</div>
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
