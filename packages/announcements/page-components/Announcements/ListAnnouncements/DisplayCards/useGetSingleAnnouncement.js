/* eslint-disable react-hooks/exhaustive-deps */
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetSingleAnnouncement = ({
	announcement_id = '',
	listData = [],
	currentAnnouncement = null,
	setCurrentAnnouncement = () => {},
}) => {
	const [announcementDetails, setAnnouncementDetails] = useState({});
	const [defaultValues, setDefaultValues] = useState({});
	const [disabled, setDisabled] = useState(false);
	const [index, setIndex] = useState();

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
		setCurrentAnnouncement(listData?.[key]);
		setIndex(key);
	};

	return {
		handleAnnouncementDetails,
		defaultValues,
		refetch                   : getAnnouncement,
		loadingSingleAnnouncement : loading,
		announcementDetails       : announcementDetails || {},
		disabled,
	};
};

export default useGetSingleAnnouncement;
