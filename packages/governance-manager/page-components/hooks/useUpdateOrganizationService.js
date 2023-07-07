import { useRequest } from '@cogoport/request';

function useUpdateOrganizationService({ organization_id, stage_of_approval, service, getOrganizationService }) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_organization_service',
	}, { manual: true });

	const UpdateOrganizationService = async () => {
		try {
			await trigger({
				params: {
					stage_of_approval,
					organization_id,
					service,
				},
			});
			getOrganizationService();
		} catch (err) {
			console.log(err);
		}
	};
	return {
		loading,
		UpdateOrganizationService,
	};
}
export default useUpdateOrganizationService;
