import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';

const useCreateCsdConfig = ({ setActiveItem = () => {} }) => {
	const router = useRouter();
	const [{ loading }, trigger] = useAllocationRequest({
		url     : 'create_csd_config',
		method  : 'POST',
		authkey : 'post_allocation_create_csd_config',
	}, { manual: true });

	const createCsdConfig = async ({ values = {} }) => {
		try {
			const res = await trigger({
				data: {
					cogo_entity_id    : values.cogo_entity_id,
					booking_source    : 'app_platform',
					agent_id          : '6fd98605-9d5d-479d-9fac-cf905d292b88',
					config_type       : values.config_type,
					segment           : values.segment,
					organization_ids  : values.organization_ids,
					organization_type : values.organization_type,
				},
			});

			await router.push(`/customer-service-desk-management/create-config?id=${res?.data?.id}`);
			setActiveItem('set_configuration');
			Toast.success('Created Successfully!');
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
