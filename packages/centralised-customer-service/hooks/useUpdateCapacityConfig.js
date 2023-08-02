import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';

const MESSAGE_MAPPING = {
	active   : 'Activated',
	draft    : 'Saved',
	inactive : 'Deactivated',
};

const useUpdateCapacityConfig = ({ setShowModal = () => {}, configId, fetchList = () => {} }) => {
	const router = useRouter();

	const { id } = router.query;

	const [{ loading }, trigger] = useAllocationRequest({
		url     : 'update_ccs_shipment_capacity_details',
		method  : 'POST',
		authkey : 'post_allocation_update_ccs_shipment_capacity_details',
	}, { manual: true });

	const updateCapacityConfig = async ({ status = '' }) => {
		try {
			await trigger({
				data: {
					config_id: id || configId,
					status,
				},
			});

			if (!configId) router.push('/centralised-customer-service?activeTab=shipment_capacity_config');

			fetchList();

			Toast.success(`${MESSAGE_MAPPING[status]} Successfully!`);
		} catch (error) {
			if (error.response?.data?.status) Toast.error('Config already exist');
			else Toast.error(getApiErrorString(error.response?.data));
		}
		setShowModal(false);
	};

	return {
		updateCapacityConfig,
		loading,
	};
};

export default useUpdateCapacityConfig;
