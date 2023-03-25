import { Placeholder } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { startCase, isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../commons/EmpyState';

import DisplayCard from './DisplayCard';
import styles from './styles.module.css';
import useGetSingleAnnouncement from './useGetSingleAnnouncement';

function DisplayCards({
	activeTab = 'active',
	data = [],
	loading = false,
	loadingUpdate = false,
	loadingEditAndGoLive = false,
	setCurrentAnnouncement = () => {},
	currentAnnouncement = null,
	deleteAnnouncement = () => {},
	goLive = () => {},
}) {
	const {
		user_data,
	} = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));

	const {
		user: { id: user_id = '' },
	} = user_data;
	const {
		handleAnnouncementDetails = () => {},
		refetch = () => {},
		loadingSingleAnnouncement = false,
		announcementDetails = {},
	} = useGetSingleAnnouncement({ currentAnnouncement, setCurrentAnnouncement, listData: data });

	if (loading) {
		if (activeTab === 'active') {
			return Array.from(Array(5)).map(() => (
				<Placeholder
					height="90px"
					width="100%"
					margin="16px 0px 20px 0px"
				/>
			));
		}

		return Array.from(Array(6)).map(() => <Placeholder height="65px" width="100%" margin="16px 0px 20px 0px" />);
	}

	if (isEmpty(data)) {
		return (
			<EmptyState text={`There are no ${startCase(activeTab)} Announcements`} />
		);
	}

	return (
		<div className={styles.container}>
			{data.map((item, index) => (
				<DisplayCard
					key={item.id}
					activeTab={activeTab}
					refetch={refetch}
					loadingUpdate={loadingUpdate}
					loadingSingleAnnouncement={loadingSingleAnnouncement}
					loadingEditAndGoLive={loadingEditAndGoLive}
					data={item}
					user_id={user_id}
					index={index}
					accordianData={announcementDetails?.[index]}
					handleAnnouncementDetails={handleAnnouncementDetails}
					deleteAnnouncement={deleteAnnouncement}
					goLive={goLive}
				/>
			))}
		</div>
	);
}

export default DisplayCards;
