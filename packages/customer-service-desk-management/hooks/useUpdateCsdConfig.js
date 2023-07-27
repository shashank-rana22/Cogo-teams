import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';

const MESSAGE_MAPPING = {
	active   : 'Activated',
	draft    : 'Saved',
	inactive : 'Deactivated',
};

const useUpdateCsdConfig = ({ setShowModal = () => {} }) => {
	const router = useRouter();
	const [{ loading }, trigger] = useAllocationRequest({
		url     : 'update_csd_config',
		method  : 'POST',
		authkey : 'post_allocation_update_csd_config',
	}, { manual: true });

	const updateCsdConfig = async ({ status = '', id }) => {
		try {
			await trigger({
				data: {
					id,
					status,
				},
			});

			router.push('/customer-service-desk-management');
			Toast.success(`${MESSAGE_MAPPING[status]} Successfully!`);
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
		setShowModal(false);
	};

	return {
		updateCsdConfig,
		loading,
	};
};

export default useUpdateCsdConfig;
