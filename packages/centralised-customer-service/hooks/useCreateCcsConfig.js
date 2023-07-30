import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';

const apiMapping = ({ id }) => {
	if (id) {
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

const useCreateCssConfig = ({ setShowModal = () => {} }) => {
	const router = useRouter();

	const { id } = router.query;

	const { url = '', authkey = '' } = apiMapping({ id });

	const [{ loading }, trigger] = useAllocationRequest({
		url,
		method: 'POST',
		authkey,
	}, { manual: true });

	const createCcsConfig = async ({ values = {} }) => {
		try {
			await trigger({
				data: {
					id,
					...values,
				},
			});

			setShowModal(false);

			router.push('/centralised-customer-service?activeTab=org_config');

			Toast.success(`${(id) ? 'Updated' : 'Created'} Successfully!`);
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
