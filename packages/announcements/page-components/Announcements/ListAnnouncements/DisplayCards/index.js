import React from 'react';

import DisplayCard from './DisplayCard';
import styles from './styles.module.css';
import useGetSingleAnnouncement from './useGetSingleAnnouncement';

function DisplayCards({
	data = [],
	setCurrentAnnouncement = () => {},
	currentAnnouncement = null,
	deleteAnnouncement = () => {},
}) {
	const {
		handleAnnouncementDetails = () => {},
		refetch = () => {},
		loading = false,
		announcementDetails = {},
	} = useGetSingleAnnouncement({ currentAnnouncement, setCurrentAnnouncement, listData: data });
	// console.log('details', announcementDetails);
	return (
		<div className={styles.container}>
			{data.map((item, index) => (
				<DisplayCard
					loading={loading}
					refetch={refetch}
					data={item}
					index={index}
					accordianData={announcementDetails}
					handleAnnouncementDetails={handleAnnouncementDetails}
					deleteAnnouncement={deleteAnnouncement}
				/>
			))}
		</div>
	);
}

export default DisplayCards;
