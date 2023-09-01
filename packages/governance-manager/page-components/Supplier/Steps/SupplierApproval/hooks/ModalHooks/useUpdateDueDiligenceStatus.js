import { useRequest } from '@cogoport/request';

function useUpdateOrganizationDueDiligenceStatus({
	id,
	organization_id,
	setOpen,
	getOrganizationSupplierVerificationDetails,
}) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_organization_due_diligence_report',
	}, { manual: true });

	const UpdateOrganizationDueDiligenceStatus = async ({ verification_status }) => {
		try {
			if (!organization_due_diligence_id || !organization_id) { return; }
			await trigger({
				params: {
					id,
					organization_id,
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
		UpdateOrganizationDueDiligenceStatus,
	};
}

export default useUpdateOrganizationDueDiligenceStatus;
