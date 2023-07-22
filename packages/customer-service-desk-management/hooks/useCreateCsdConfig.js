import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

const useCreateCsdConfig = () => {
	const [{ loading }, trigger] = useAllocationRequest({
		url     : 'create_csd_config',
		method  : 'POST',
		authkey : 'post_allocation_create_csd_config',
	}, { manual: true });

	const createCsdConfig = async ({ values = {} }) => {
		try {
			// const payload = {
			// 	// requests      : requestPayload,
			// 	// third_parties : thirdPartyPayload,
			// };

			await trigger({
				data: { cogo_entity_id: values.cogo_entity_id },
			});

			Toast.success('Request has been initiated successfully.');

			// setActiveTab('requests_sent');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		createCsdConfig,
		loading,
	};
};

export default useCreateCsdConfig;
