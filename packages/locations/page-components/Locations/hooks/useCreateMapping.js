import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useCreateMapping = ({ location, onClose }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/create_location_mapping',
	}, { manual: true });

	const createMapping = async (payload) => {
		try {
			await trigger({
				data: { ...payload, icd_port_id: location.id },
			});
			Toast.success('Mapping created');
			onClose();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		createMapping,
		loading,
	};
};

export default useCreateMapping;
