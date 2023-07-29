import { useRequest } from '@cogoport/request';

const ZERO = 0;

function useUpdateOrganizationDueDiligenceStatus({
	organization_service_id,
	organization_due_diligence_id,
	organization_id,
	setOpen,
}) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_organization_due_diligence_status',
	}, { manual: true });

	const UpdateOrganizationDueDiligenceStatus = async ({ manager_approval_status }) => {
		try {
			await trigger({
				params: {
					organization_due_diligence_id,
					organization_id,
					organization_service_id,
					manager_approval_status,
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
		UpdateOrganizationDueDiligenceStatus,
	};
}

export default useUpdateOrganizationDueDiligenceStatus;
