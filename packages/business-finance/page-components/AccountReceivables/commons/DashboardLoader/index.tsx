import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function DashboardLoader() {
	return (
		<>
			{
		[1, 2, 3].map(() => (

			<div className={styles.card}>
				<div className={styles.row}>
					{
				[1, 2, 3].map(() => (
					<Placeholder style={{ margin: '0px 8px' }} />
				))
                      }
				</div>

			</div>

		))
	}
		</>
	);
}
export default DashboardLoader;
