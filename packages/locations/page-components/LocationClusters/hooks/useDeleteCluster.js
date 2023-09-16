import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useDeleteCluster = ({ refetch = () => {}, data = {} }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_location_cluster',
		method : 'POST',
	}, { manual: true });

	const handleDeleteCluster = async () => {
		try {
			await trigger({
				data: {
					id     : data?.id,
					status : 'inactive',
				},
			});
			Toast.success('Cluster Deleted Successfully');
			refetch();
		} catch (error) {
			toastApiError(error);
		}
	};
	return {
		handleDeleteCluster,
		loading,
	};
};
export default useDeleteCluster;
