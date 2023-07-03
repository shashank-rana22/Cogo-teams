import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const arr = ['1', '2', '3'];

function SopLoader() {
	return (
		<div className={styles.details_container}>
			<div className={styles.sop_header}>
				<Placeholder height="15px" width="100px" />
				<Placeholder height="20px" width="20px" />
			</div>

			<div className={styles.sop_details_container}>
				<div className={styles.company_details}>
					<Placeholder />

					<Placeholder height="20px" width="75px" />
				</div>

				{(arr || []).map((i) => (
					<div className={i === '3' ? styles.last : ''} key={i}>
						<Placeholder height="20px" width="155px" />
						<Placeholder style={{ marginTop: '10px' }} />
					</div>
				))}
			</div>
		</div>
	);
}

export default SopLoader;
