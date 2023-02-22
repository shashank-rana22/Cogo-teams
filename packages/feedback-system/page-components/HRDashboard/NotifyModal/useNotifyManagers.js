import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useNotifyManagers = ({ setNotifyModal = () => {} }) => {
	const [{ loading = false, data = {} }, trigger] = useRequest({
		url    : 'create_communication',
		method : 'post',
	}, { manual: true });

	const notify = async () => {
		try {
			await trigger({ data: {} });
			const { manager_count = '20' } = data;

			setNotifyModal(false);
			Toast.success(`${manager_count} Managers Notified...`);
		} catch (e) {
			Toast.error(e.toString());
		}
	};

	return { notify, loading, data };
};

export default useNotifyManagers;
