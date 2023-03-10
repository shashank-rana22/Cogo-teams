import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

// import AnnouncementForm from './AnnouncementForm';
// import useAnnouncement from './useAnnouncement';
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
			<div className={styles.form_container}>
				<div className={styles.heading}>
					Manage Announcements
					<Button themeType="primary" onClick={onClick}>Add Announcement</Button>

				</div>
				<ListAnnoucemnets />
				{/* <AnnouncementForm /> */}
			</div>
			<div className={styles.preview_container}>
				{/* Preview  */}

			</div>

		</div>
	);
}

export default Announcements;
