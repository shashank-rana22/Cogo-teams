import { useRequest } from '@cogoport/request';

function useUpdateOrganizationContract() {
	const [{ data, loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_organization_contract',
	}, { manual: true });

	const UpdateOrganizationContract = async () => {
		try {
			await trigger({
				params: {
					id                              : '6152437d-06ff-43fb-9cc5-938e5672cfee',
					organization_contract_config_id : '7f67b0aa-43b1-44bc-8673-a9b8f5e8b9b8',
					status                          : 'active',
					variables_details               : [
						{
							variable_name : 'confirmation_time',
							default_value : 2.0,
							default_unit  : 'hours',
							updated_value : 10.0,
							updated_unit  : 'hours',
						}],
					state: 'updated',
				},
			});
		} catch (err) {
			console.log(err);
		}
	};
	return {
		data,
		loading,
		UpdateOrganizationContract,
	};
}
export default useUpdateOrganizationContract;
