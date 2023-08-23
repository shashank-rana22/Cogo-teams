import { useRequest } from '@cogoport/request';

function useUpdateOrganizationService({ organization_id, stage_of_approval, service, getOrganizationService }) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_organization_service',
	}, { manual: true });

	const updateOrganizationService = async (status) => {
		try {
			await trigger({
				params: {
					stage_of_approval,
					organization_id,
					service,
					status,
					delete_rest_expertise: false,
				},
			});
			getOrganizationService();
		} catch (err) {
			console.log(err);
		}
	};
	return {
		data,
		loading,
		updateOrganizationService,
	};
}

export default useUpdateOrganizationService;
