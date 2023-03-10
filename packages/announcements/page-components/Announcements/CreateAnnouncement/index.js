import React from 'react';

import AnnouncementForm from './AnnouncementForm';
import styles from './styles.module.css';
import useCreateAnnouncements from './useCreateAnnouncement';

function CreateAnnouncement() {
	const defaultValues = {};
	const {
		controls,
		control,
		watch,
		handleSubmit,
		onSubmit,
		showPreview,
		setShowPreview,
		loading,
		errors,
		// setValue,
	} = useCreateAnnouncements({ defaultValues });
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Create Announcement
			</div>
			<div className="form">
				<AnnouncementForm
					controls={controls}
					control={control}
					watch={watch}
					handleSubmit={handleSubmit}
					onSubmit={onSubmit}
					showPreview={showPreview}
					setShowPreview={setShowPreview}
					loading={loading}
					errors={errors}
				/>
			</div>
		</div>
	);
}

export default CreateAnnouncement;
