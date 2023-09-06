import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

function useUpdateOrganizationContract({ item, id, updatedValue, getOrganizationContract }) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_organization_service_contract',
	}, { manual: true });
	const updateOrganizationContract = async (state) => {
		try {
			await trigger({
				params: {
					id,
					config_id        : item?.config_id,
					status           : item?.status,
					variable_details : (
						state === 'approved'
							? item?.variable_details
							: item?.variable_details?.map(
								(variable) => ({ ...variable, updated_value: updatedValue || undefined }),
							)),
					state,
				},
			});
			Toast.success(state === 'approved' ? 'Confirmed' : 'Updated');
			getOrganizationContract();
		} catch (err) {
			console.log(err);
		}
	};
	return {
		data,
		loading,
		updateOrganizationContract,
	};
}
export default useUpdateOrganizationContract;
