import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useState, useEffect } from 'react';

import useGetSingleAnnouncement from '../ListAnnouncements/DisplayCards/useGetSingleAnnouncement';

import AnnouncementForm from './AnnouncementForm';
import styles from './styles.module.css';

function CreateAnnouncement() {
	const { query, push } = useRouter();

	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		if (window.innerWidth < 768) {
			setIsMobile(true);
		}

		function handleResize() {
			setIsMobile(window.innerWidth < 768);
		}
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const onClickBackIcon = () => {
		push(
			'/announcements',
			'/announcements',
		);
	};

	const { announcement_id = '' } = query;

	const actionType = announcement_id ? 'edit' : 'create';

	const {
		defaultValues = {},
		disabled = false,
		loadingSingleAnnouncement = false,
	} = useGetSingleAnnouncement({ announcement_id });

	return (
		<div className={styles.container}>
			<div className={styles.back_div} role="presentation" onClick={onClickBackIcon}>
				<IcMArrowBack width={20} height={20} />

				<div className={styles.back}>Back to Dashboard</div>
			</div>

			<div className={styles.heading}>
				{announcement_id ? 'Update Announcement' : 'Create Announcement'}
			</div>

			<div className="form">
				<AnnouncementForm
					defaultValues={defaultValues}
					disabled={disabled}
					loadingForm={loadingSingleAnnouncement}
					announcement_id={announcement_id}
					actionType={actionType}
					isMobile={isMobile}
				/>
			</div>
		</div>
	);
}

export default CreateAnnouncement;
