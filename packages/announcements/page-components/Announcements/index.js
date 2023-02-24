import React from 'react';

import AnnouncementForm from './AnnouncementForm';
// import useAnnouncement from './useAnnouncement';
import styles from './styles.module.css';

function Announcements() {
	return (
		<div className={styles.container}>
			<div className={styles.form_container}>
				<div className={styles.heading}>Announcement Form</div>

				<AnnouncementForm />
			</div>
			<div className={styles.preview_container}>
				{/* Preview  */}

			</div>

		</div>
	);
}

export default Announcements;
