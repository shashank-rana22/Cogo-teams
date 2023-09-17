import { Image } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function NoSchedulesCard({ loading = true }) {
	return (
		<div>

			{
		!loading && (
			<div className={styles.card}>
				<Image
					alt="empty"
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/empty_icon 1.svg"
					height={200}
					width={300}
				/>
				No Schedules Found
			</div>
		)
	}
		</div>
	);
}

export default NoSchedulesCard;
