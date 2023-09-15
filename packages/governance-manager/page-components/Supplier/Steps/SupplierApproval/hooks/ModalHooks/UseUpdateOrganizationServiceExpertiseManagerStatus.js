import { useRequest } from '@cogoport/request';

function useUpdateOrganizationServiceExpertiseManagerStatus({
	service_id,
	organization_id,
	setOpen,
	getOrganizationSupplierVerificationDetails,
}) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_organization_service_expertise_verification_status',
	}, { manual: true });

	const updateOrganizationServiceExpertiseManagerStatus = async ({ verification_status }) => {
		try {
			await trigger({
				params: {
					service_id,
					organization_id,
					verification_status,
				},
			});
			getOrganizationSupplierVerificationDetails();
			setOpen(null);
		} catch (err) {
			console.log(err);
		}
	};
	return {
		data,
		loading,
		updateOrganizationServiceExpertiseManagerStatus,
	};
}

export default useUpdateOrganizationServiceExpertiseManagerStatus;
