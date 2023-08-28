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
					organization_contract_config_id : item?.organization_contract_configuration_id,
					status                          : item?.status,
					variables_details:
					item?.variables_details?.map((variable) => ({ ...variable, updated_value: updatedValue })),
					state,
				},
			});
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
