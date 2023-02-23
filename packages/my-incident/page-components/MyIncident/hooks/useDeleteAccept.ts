import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useDeleteAccept = ({ userIncidentStatus, id, remarks, refetch }) => {
	const {
		user_data:UserData,
	} = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const { user: { id:userId = '' } } = UserData;

	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/incident-management/incident/user-incident-status',
			method  : 'PATCH',
			authKey : 'patch_incident_management_incident_user_incident_status',
		},
		{ manual: true },
	);
	let status = '';
	if (userIncidentStatus === 'REQUESTED') {
		status = 'DELETED';
	} else if (userIncidentStatus === 'PENDING_ACTION') {
		status = 'CLOSED';
	}

	const onDeleteAccept = async () => {
		try {
			await trigger({
				data: {
					userIncidentStatus : status,
					id,
					remarks,
					createdBy          : userId,
				},
			});
			Toast.success(status);
			refetch();
		} catch (err) {
			if (!loading) {
				Toast.error(err?.response?.data?.message || 'Something went Wrong');
			}
		}
	};

	return {
		onDeleteAccept,
		data,
		loadingOndelete: loading,
	};
};
export default useDeleteAccept;
