import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useGetSecurityDepositData = ({
	data = {},
	refetch = () => {},
	setDetailsModal = () => {},
	id = '',
	remarkValue = '',
	t = () => {},
}) => {
	const { user_id:userId } = useSelector(({ profile }) => ({
		user_id: profile?.user?.id,
	}));

	const [
		{ loading },
		trigger,
	] = useRequestBf(
		{
			url     : `/incident-management/incident/${id}`,
			method  : 'patch',
			authKey : 'patch_incident_management_incident_by_id',
		},
		{ manual: true },
	);

	const getData = async ({ status }) => {
		try {
			const payload = {
				data,
				status,
				remark    : remarkValue,
				updatedBy : userId,
			};
			const apiResponse = await trigger({
				data: payload,
			});
			const {
				data: { message },
			} = apiResponse;
			if (message === 'Updated Successfully') {
				Toast.success(t('incidentManagement:request_updated_successfully_message'));
				setDetailsModal(null);
				refetch();
			} else {
				Toast.error(message);
			}
		} catch (e) {
			Toast.error(e?.response?.data?.message);
		}
	};

	return {
		getData,
		loading,
	};
};

export default useGetSecurityDepositData;
