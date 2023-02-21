import { useRequest } from '@cogoport/request';

const useNotifyManagers = () => {
	const notifyAPI = useRequest({
		url    : 'notify_managers',
		method : 'post',
	}, { manual: true });

	const notify = async () => {
		const [trigger, { loading = false, data = {} }] = notifyAPI;
		await trigger({ data: { notify_managers: true } });

		return { loading, data };
	};

	return { notify };
};

export default useNotifyManagers;
