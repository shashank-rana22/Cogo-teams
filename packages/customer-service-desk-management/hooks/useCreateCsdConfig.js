import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

const apiMapping = ({ isEditMode = false, id }) => {
	if (isEditMode || !isEmpty(id)) {
		return {
			url     : 'update_csd_config',
			authkey : 'post_allocation_update_csd_config',
		};
	}
	return {
		url     : 'create_csd_config',
		authkey : 'post_allocation_create_csd_config',
	};
};

const useCreateCsdConfig = ({ setActiveItem = () => {} }) => {
	const router = useRouter();

	const { mode = '', id } = router.query;

	const isEditMode = mode === 'edit';

	const { url = '', authkey = '' } = apiMapping({ isEditMode, id });

	const [{ loading }, trigger] = useAllocationRequest({
		url,
		method: 'POST',
		authkey,
	}, { manual: true });

	const createCsdConfig = async ({ values = {} }) => {
		try {
			const res = await trigger({
				data: {
					id,
					...values,
				},
			});

			if (!isEditMode) {
				await router.push(`/customer-service-desk-management/create-config?id=${res?.data?.id}`);
			}

			setActiveItem('set_configuration');

			Toast.success(`${(isEditMode || !isEmpty(id)) ? 'Updated' : 'Created'} Successfully!`);
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
