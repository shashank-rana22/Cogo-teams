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

	const updateOrganizationDueDiligenceStatus = async ({ verification_status }) => {
		try {
			if (!id || !organization_id) { return; }
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
		updateOrganizationDueDiligenceStatus,
	};
}

export default useUpdateOrganizationDueDiligenceStatus;
