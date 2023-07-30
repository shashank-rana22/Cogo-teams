import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';

const apiMapping = ({ id, source = '' }) => {
	if (id || source) {
		return {
			url     : 'update_ccs_config',
			authkey : 'post_allocation_update_ccs_config',
		};
	}
	return {
		url     : 'create_ccs_config',
		authkey : 'post_allocation_create_ccs_config',
	};
};

const useCreateCssConfig = ({ setShowModal = () => {}, source = '', fetchList = () => {} }) => {
	const router = useRouter();

	const { id } = router.query;

	const { url = '', authkey = '' } = apiMapping({ id, source });

	const [{ loading }, trigger] = useAllocationRequest({
		url,
		method: 'POST',
		authkey,
	}, { manual: true });

	const createCcsConfig = async ({ values = {}, configId }) => {
		try {
			await trigger({
				data: {
					id     : id || configId,
					...(source ? { status: 'inactive' } : values),
					status : 'active',
				},
			});

			setShowModal(false);

			if (!source) router.push('/centralised-customer-service?activeTab=org_config');

			fetchList();

			Toast.success(`${(id || source) ? 'Updated' : 'Created'} Successfully!`);
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		createCcsConfig,
		loading,
	};
};

export default useCreateCssConfig;
