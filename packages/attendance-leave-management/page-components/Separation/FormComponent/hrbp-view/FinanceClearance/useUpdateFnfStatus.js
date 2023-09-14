import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useUpdateFnfStatus = ({ refetch = () => {} }) => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/update_fnf_detail_status',
	}, { manual: true });

	const updateApplication = async ({ id = '', status = '' }) => {
		try {
			await trigger({
				data: {
					id, status,
				},
			});
			refetch();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		loading,
		updateApplication,
	};
};

export default useUpdateFnfStatus;
