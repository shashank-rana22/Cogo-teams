import { useRequest } from '@cogoport/request';

function useCreateOrganizationEvaluation({
	id, organization_id, feedback,
	updateOrganizationService,
}) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'post',
		url    : '/create_organization_service_evaluation',
	}, { manual: true });

	const createOrganizationEvaluation = async (status = 'active') => {
		try {
			await trigger({
				params: {
					feedback,
					organization_id,
					organization_service_id: id,
					status,
				},
			});
			if (status === 'active') { updateOrganizationService(); }
		} catch (err) {
			console.log(err);
		}
	};
	return {
		data,
		loading,
		createOrganizationEvaluation,
	};
}
export default useCreateOrganizationEvaluation;
