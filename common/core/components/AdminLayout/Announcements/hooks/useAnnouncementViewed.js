import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';

const useAnnouncementViewed = (fetchAnnouncements = () => {}) => {
	const { profile = {} } = useSelector((state) => state);

	const { partner = {}, user = {} } = profile;

	const { id:user_id } = user;

	const { id: partner_id } = partner;

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : 'create_announcement_stat',
	}, { manual: true });

	const announcementViewed = async (id) => {
		try {
			const payload = {
				announcement_id   : id,
				user_id,
				partner_id,
				viewed_at         : new Date(),
				performed_by_id   : user_id,
				performed_by_type : 'agent',
			};

			await trigger({
				data: payload,
			});

			fetchAnnouncements();
		} catch (error) {
			if (error?.response) {
				Toast.error(startCase(getApiErrorString(error?.response?.data)) || 'Something went wrong');
			}
		}
	};

	return {
		announcementViewed,
		announcementViewedloading: loading,
	};
};

export default useAnnouncementViewed;
