import { useRequest } from '@cogoport/request';

// this will get called in step 1
function useUpdateOrganizationService({ organization_id, approval_stage, service, getOrganizationService }) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_organization_service',
	}, { manual: true });

	const UpdateOrganizationService = async () => {
		try {
			await trigger({
				params: {
					approval_stage,
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
		data,
		loading,
		UpdateOrganizationService,
	};
}

export default useUpdateOrganizationService;
