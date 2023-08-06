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
			const payload = {
				id     : id || configId,
				status : 'active',
				...(source ? { status: 'inactive' } : {
					cogo_entity_id    : values.cogo_entity_id || undefined,
					config_type       : values.config_type || undefined,
					organization_ids  : values.organization_ids || undefined,
					organization_type : values.organization_type || undefined,
					segment           : values.segment || undefined,
					agent_id          : values.agent_id || undefined,
					booking_source    : values.booking_source || undefined,
					preferred_role_id : values.preferred_role_id || undefined,
				}),
			};

			await trigger({
				data: payload,
			});

			setShowModal(false);

			if (!source) router.push('/centralised-customer-service?activeTab=org_config');

			fetchList();

			Toast.success(`${(id || source) ? 'Updated' : 'Created'} Successfully!`);
		} catch (error) {
			if (error.response?.data?.status) Toast.error('Config already exist');
			else Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		createCcsConfig,
		loading,
	};
};

export default useCreateCssConfig;
