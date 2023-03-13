/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetSingleAnnouncement = ({
	announcement_id = '',
	listData = [],
	currentAnnouncement = null,
	setCurrentAnnouncement = () => {},
}) => {
	// const [announcementDetailsToggle, setAnnouncementDetailsToggle] = useState(false);
	const [announcementDetails, setAnnouncementDetails] = useState({});
	const [defaultValues, setDefaultValues] = useState({});
	const [disabled, setDisabled] = useState(false);
	const [index, setIndex] = useState();
	// console.log('details', announcementDetails);

	const [{ loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_announcement',
	}, { manual: true });

	const getDetails = async (key) => {
		if (currentAnnouncement?.id) {
			try {
				const res = await trigger({
					params: { id: currentAnnouncement?.id },
				});
				setAnnouncementDetails({ ...announcementDetails, [key]: res?.data });
			} catch (err) {
				// Toast.error(err?.data);
				console.log(err?.data);
			}
		}
	};

	useEffect(() => {
		(async () => {
			if (announcement_id) {
				try {
					const res = await trigger({
						params: { id: announcement_id },
					});
					setDisabled(true);

					setDefaultValues(res?.data);
				} catch (err) {
					// Toast.error(err?.message);
					console.log(err?.message);
				}
			}
		})();
	}, []);

	useEffect(() => {
		getDetails(index);
	}, [currentAnnouncement]);

	const getAnnouncement = async (id, key) => {
		const res = await trigger({
			params: { id },
		});

		setAnnouncementDetails({ ...announcementDetails, [key]: res?.data });
	};

	const handleAnnouncementDetails = (key) => {
		// setAnnouncementDetailsToggle(announcementDetailsToggle === key ? false : key);
		// if (currentAnnouncement && announcementDetailsToggle === key) {
		// 	setCurrentAnnouncement(null);
		// } else {
		// 	setAnnouncementDetails(null);
		// }
		setCurrentAnnouncement(listData?.[key]);
		setIndex(key);
	};

	return {
		handleAnnouncementDetails,
		// announcementDetailsToggle,
		defaultValues,
		refetch                   : getAnnouncement,
		loadingSingleAnnouncement : loading,
		announcementDetails       : announcementDetails || {},
		disabled,
	};
};

export default useGetSingleAnnouncement;
