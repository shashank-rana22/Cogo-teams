import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import getTagPayload from '../helpers/getTagPayload';
import toastApiError from '../utils/toastApiError';

const useUpdateCluster = ({ setShow = () => {}, refetch = () => {}, data = {} }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_location_cluster',
		method : 'POST',
	}, { manual: true });

	const handleUpdateCluster = async (value) => {
		const withTagPayload = getTagPayload({ value, forUpdate: true, data });
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
		handleUpdateCluster,
		loading,
	};
};
export default useUpdateCluster;
