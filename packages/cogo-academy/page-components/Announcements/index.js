import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import ListAnnoucemnets from './ListAnnouncements';
import styles from './styles.module.css';

function Announcements() {
	const router = useRouter();

	const onClick = () => {
		router.push(
			'/announcements/create',
			'/announcements/create',
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.main_container}>
				<div className={styles.heading}>
					Manage Announcements
					<Button type="button" themeType="primary" onClick={onClick}>Add Announcement</Button>
				</div>

				<ListAnnoucemnets />
			</div>
		</div>
	);
}

export default Announcements;
