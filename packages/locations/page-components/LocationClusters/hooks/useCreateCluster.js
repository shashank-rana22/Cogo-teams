import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import getTagPayload from '../helpers/getTagPayload';
import toastApiError from '../utils/toastApiError';

const useCreateCluster = ({ setShow, refetch }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_location_cluster',
		method : 'POST',
	}, { manual: true });

	const handleCreateCluster = async (value) => {
		const withTagPayload = getTagPayload({ value });
		try {
			await trigger({
				data: withTagPayload,
			});
			Toast.success('Cluster Created Successfully');
			setShow(false);
			refetch();
		} catch (error) {
			toastApiError(error);
		}
	};
	return {
		handleCreateCluster,
		loading,
	};
};
export default useCreateCluster;
