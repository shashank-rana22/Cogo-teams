import { useRequest } from '@cogoport/request';

const ZERO = 0;

function useUpdateOrganizationServiceExpertiseManagerStatus({
	service_id,
	organization_id,
	setOpen,
	manager_approval_status,
}) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_organization_service_expertise_manager_status',
	}, { manual: true });

	const UpdateOrganizationServiceExpertiseManagerStatus = async () => {
		try {
			await trigger({
				params: {
					service_id,
					organization_id,
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
		UpdateOrganizationServiceExpertiseManagerStatus,
	};
}

export default useUpdateOrganizationServiceExpertiseManagerStatus;
