/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetSingleAnnouncement = ({
	listData = [],
	currentAnnouncement = null,
	setCurrentAnnouncement = () => {},
}) => {
	// console.log('currentUser', currentUser);
	const [announcementDetailsToggle, setAnnouncementDetailsToggle] = useState(false);

	const [announcementDetails, setAnnouncementDetails] = useState({});

	const [{ loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_announcement',
	}, { manual: true });

	useEffect(() => {
		(async () => {
			if (currentAnnouncement?.id) {
				try {
					const res = await trigger({
						params: { announcement_id: currentAnnouncement?.id },
					});
					setAnnouncementDetails(res?.data);
				} catch (err) {
					Toast.error(err?.data);
				}
			}
		})();
	}, [currentAnnouncement]);

	const getAnnouncement = async () => {
		const res = await trigger({
			params: { announcement_id: currentAnnouncement?.id },
		});

		setAnnouncementDetails(res?.data);
	};

	const handleAnnouncementDetails = (key) => {
		setAnnouncementDetailsToggle(announcementDetailsToggle === key ? false : key);
		if (currentAnnouncement && announcementDetailsToggle === key) {
			setCurrentAnnouncement(null);
		} else {
			setAnnouncementDetails(null);
			setCurrentAnnouncement(listData?.[key]);
		}
	};

	return {
		handleAnnouncementDetails,
		// announcementDetailsToggle,
		refetch             : getAnnouncement,
		loading,
		announcementDetails : announcementDetails || {},
	};
};

export default useGetSingleAnnouncement;
