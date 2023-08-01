import { useRequest } from '@cogoport/request';

function useUpdateOrganizationDueDiligenceStatus({
	organization_service_id,
	organization_due_diligence_id,
	organization_id,
	setOpen,
	getOrganizationSupplierVerificationDetails,
}) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_organization_due_diligence_status',
	}, { manual: true });

	const UpdateOrganizationDueDiligenceStatus = async ({ manager_approval_status }) => {
		try {
			if (!organization_due_diligence_id || !organization_id || !organization_service_id) { return; }
			await trigger({
				params: {
					organization_due_diligence_id,
					organization_id,
					organization_service_id,
					manager_approval_status,
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
		UpdateOrganizationDueDiligenceStatus,
	};
}

export default useUpdateOrganizationDueDiligenceStatus;
