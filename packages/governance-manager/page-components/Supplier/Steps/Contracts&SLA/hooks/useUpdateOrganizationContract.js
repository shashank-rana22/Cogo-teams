import { useRequest } from '@cogoport/request';

function useUpdateOrganizationContract() {
	const [{ data, loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_organization_contract',
	}, { manual: true });

	const updateOrganizationContract = async () => {
		try {
			await trigger({
				params: {

				},
			});
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
