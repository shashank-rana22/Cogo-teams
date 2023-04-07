import { useSelector } from '@cogoport/store';
import { startCase, isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../commons/EmpyState';

import DisplayCard from './DisplayCard';
import LoadingState from './loading';
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
			return <LoadingState loadingCount={5} height="90px" itemHeight="32px" />;
		}

		return <LoadingState loadingCount={6} height="80px" itemHeight="28px" />;
	}

	if (isEmpty(data)) {
		return (
			<EmptyState text={`No ${startCase(activeTab)} Announcements Found`} />
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
