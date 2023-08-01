import { useRequest } from '@cogoport/request';

function useUpdateOrganizationServiceExpertiseManagerStatus({
	service_id,
	organization_id,
	setOpen,
	getOrganizationSupplierVerificationDetails,
}) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_organization_service_expertise_manager_status',
	}, { manual: true });

	const updateOrganizationServiceExpertiseManagerStatus = async ({ manager_approval_status }) => {
		try {
			await trigger({
				params: {
					service_id,
					organization_id,
					manager_approval_status,
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
