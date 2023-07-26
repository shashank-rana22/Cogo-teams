import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';

const apiMapping = ({ mode = '' }) => {
	if (mode === 'edit') {
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

	const { url = '', authkey = '' } = apiMapping({ mode });

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
					cogo_entity_id    : values.cogo_entity_id,
					booking_source    : 'admin_platform',
					agent_id          : '6fd98605-9d5d-479d-9fac-cf905d292b88',
					config_type       : values.config_type,
					segment           : values.segment,
					organization_ids  : values.organization_ids,
					organization_type : values.organization_type,
				},
			});

			if (!isEditMode) {
				await router.push(`/customer-service-desk-management/create-config?id=${res?.data?.id}`);
			}

			setActiveItem('set_configuration');

			Toast.success(`${isEditMode ? 'Updated' : 'Created'} Created Successfully!`);
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
