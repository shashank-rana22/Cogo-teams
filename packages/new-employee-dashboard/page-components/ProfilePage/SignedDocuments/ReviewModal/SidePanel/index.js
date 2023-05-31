import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

export default function SidePanel() {
	return (
		<div className={styles.side_container}>
			<div>
				<h4>Details</h4>

				<span>Document Type</span>
				<h4>Type 1</h4>

				<span>Document Name</span>
				<h4>Filename.pdf</h4>

				<span>Upload Date</span>
				<h4>22-Jan-2023</h4>
			</div>

			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button
					onClick={() => console.log('ekjbf')}
					type="button"
					themeType="secondary"
				>
					Reject
				</Button>
				<Button
					onClick={() => console.log('ekbeb')}
					type="button"
					themeType="primary"
					style={{ marginLeft: '12px' }}
				>
					Accept
				</Button>
			</div>
		</div>
	);
}
