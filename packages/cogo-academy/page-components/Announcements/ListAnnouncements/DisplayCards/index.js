import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../common/EmptyState';
import LoadingState from '../../common/Loading';

import DisplayCard from './DisplayCard';
import ListHeader from './ListHeader';
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
	const { user_data } = useSelector(({ profile }) => ({ user_data: profile || {} }));

	const { user: { id: user_id = '' } } = user_data;

	const {
		handleAnnouncementDetails = () => {},
		refetch = () => {},
		loadingSingleAnnouncement = false,
		announcementDetails = {},
	} = useGetSingleAnnouncement({ currentAnnouncement, setCurrentAnnouncement, listData: data });

	if (loading) {
		return (
			<div className={styles.container}>
				<ListHeader />

				<LoadingState activeTab={activeTab} />
			</div>
		);
	}

	if (isEmpty(data)) {
		return (
			<EmptyState activeTab={activeTab} />
		);
	}

	return (
		<div className={styles.container}>
			<ListHeader />

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
