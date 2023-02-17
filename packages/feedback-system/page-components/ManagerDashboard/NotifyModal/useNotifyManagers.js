import { useRequest } from '@cogoport/request';

const useNotifyManagers = () => {
	const notifyAPI = useRequest({
		url    : 'notify_managers',
		method : 'post',
	}, { manual: true });

	const getNotifiableManagersAPI = useRequest({
		url    : 'list_feedback_managers',
		method : 'get',
	}, { manual: true });

	const notify = async () => {
		const [trigger, { loading = false }] = notifyAPI;
		await trigger({ data: { notify_managers: true } });

		return { loading };
	};

	const getNotifiableManagersData = async () => {
		const [trigger, { loading = false, data = {} }] = getNotifiableManagersAPI;

		await trigger({ params: { get_notification_data: true } });
		console.log('here', data);

		return { data, loading };
	};

	return { getNotifiableManagersData, notify };
};

export default useNotifyManagers;
