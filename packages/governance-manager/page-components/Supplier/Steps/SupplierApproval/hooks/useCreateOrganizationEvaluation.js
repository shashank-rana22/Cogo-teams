import { useRequest } from '@cogoport/request';

function useCreateOrganizationEvaluation({
	organization_id,
	organization_service_id,
	setOpen,
	getOrganizationSupplierVerificationDetails,
}) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'post',
		url    : '/create_organization_service_evaluation',
	}, { manual: true });

	const createOrganizationEvaluation = async ({ verification_status }) => {
		try {
			await trigger({
				params: {
					organization_id,
					organization_service_id,
					verification_status,
				},
			});
			await getOrganizationSupplierVerificationDetails();
			setOpen(null);
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
