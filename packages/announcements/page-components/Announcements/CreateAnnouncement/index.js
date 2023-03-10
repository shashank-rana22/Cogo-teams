import React from 'react';

import AnnouncementForm from './AnnouncementForm';
import styles from './styles.module.css';

function CreateAnnouncement() {
	// const defaultValues = {};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Create Announcement
			</div>
			<div className="form">
				<AnnouncementForm />
			</div>
		</div>
	);
}

export default CreateAnnouncement;
