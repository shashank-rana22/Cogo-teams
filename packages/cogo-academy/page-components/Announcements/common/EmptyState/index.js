import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useRouter } from 'next/router';
import React from 'react';

import styles from './styles.module.css';

function EmptyState({ activeTab = 'active' }) {
	const { push } = useRouter();

	return (
		<div className={styles.container}>

			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/folder-image-with-man"
				width={220}
				alt="Empty-state"
				className={styles.img_container}
			/>

			<div className={styles.details_container}>
				<div className={styles.txt}>
					{' '}
					{`No ${startCase(activeTab)} Announcements Found`}
					{' '}
				</div>

				<div className={styles.btn}>
					{activeTab === 'active' ? (
						<Button
							onClick={() => {
								push(
									'/announcements/create',
									'/announcements/create',
								);
							}}
							themeType="accent"
						>
							Create Now
						</Button>
					) : ''}
				</div>
			</div>

		</div>
	);
}

export default EmptyState;
