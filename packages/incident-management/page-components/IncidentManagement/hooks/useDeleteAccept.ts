import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

const useDeleteAccept = ({ userIncidentStatus, id, remarks, reftech }) => {
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/incident-management/incident/user-incident-status',
			method  : 'PATCH',
			authkey : 'patch_incident_management_status',
		},
		{ manual: true },
	);
	let status = '';
	if (userIncidentStatus === 'REQUESTED') {
		status = 'DELETED';
	} else if (userIncidentStatus === 'PENDING_ACTION') {
		status = 'ACCEPTED';
	}

	const onDeleteAccept = async () => {
		try {
			await trigger({
				data: {
					userIncidentStatus: status,
					id,
					remarks,
				},
			});
			reftech();
		} catch (err) {
			if (!loading) {
				Toast.error('Failed to get incident');
			}
		}
	};

	return {
		onDeleteAccept,
		data,
	};
};
export default useDeleteAccept;
