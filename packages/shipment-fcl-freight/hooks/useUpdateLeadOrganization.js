import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

function useUpdateLeadOrganization() {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_lead_organization',
		method : 'POST',
	}, { manual: true });

	const updateLeadOrganization = async ({ payload }) => {
		try {
			await trigger({ data: payload });

			Toast.success('Successful');
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		updateLoading: loading,
		updateLeadOrganization,
	};
}

export default useUpdateLeadOrganization;
