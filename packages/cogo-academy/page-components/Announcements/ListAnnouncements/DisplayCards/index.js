import { Placeholder } from '@cogoport/components';
import { compareAsc } from '@cogoport/utils';
import React from 'react';

import DisplayCard from './DisplayCard';
import styles from './styles.module.css';
import useGetSingleAnnouncement from './useGetSingleAnnouncement';

function DisplayCards({
	activeTab = 'active',
	data = [],
	loading = false,
	setCurrentAnnouncement = () => {},
	currentAnnouncement = null,
	deleteAnnouncement = () => {},
}) {
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
	return (
		<div className={styles.container}>
			{data.map((item, index) => {
				const isValid = compareAsc(new Date(item?.validity_start), new Date());
				return (
					<DisplayCard
						activeTab={activeTab}
						refetch={refetch}
						loadingSingleAnnouncement={loadingSingleAnnouncement}
						data={item}
						isValid={isValid}
						index={index}
						accordianData={announcementDetails?.[index]}
						handleAnnouncementDetails={handleAnnouncementDetails}
						deleteAnnouncement={deleteAnnouncement}
					/>
				);
			})}
		</div>
	);
}

export default DisplayCards;
