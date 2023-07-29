import { useRequest } from '@cogoport/request';

const ZERO = 0;

function useCreateOrganizationEvaluation({
	organization_id,
	organization_service_id,
	setOpen,
}) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'post',
		url    : '/create_organization_evaluation',
	}, { manual: true });

	const CreateOrganizationEvaluation = async ({ verification_status }) => {
		try {
			await trigger({
				params: {
					organization_id,
					organization_service_id,
					verification_status,
				},
			});
			setOpen(ZERO);
		} catch (err) {
			console.log(err);
		}
	};
	return {
		data,
		loading,
		CreateOrganizationEvaluation,
	};
}

export default useCreateOrganizationEvaluation;
