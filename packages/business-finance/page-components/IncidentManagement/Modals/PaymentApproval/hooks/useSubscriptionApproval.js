import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import toastApiError from '../../../../commons/toastApiError';

const useSubscriptionApproval = ({
	remarks,
	refetch = () => {},
	setDetailsModal = () => {},
	saasUtrUploadRequest = {},
	id = '',
	orgData = {},
	apiData = {},
}) => {
	const { user_id: userId } = useSelector(({ profile }) => ({
		user_id: profile?.user?.id,
	}));

	const [{ loading }, trigger] = useRequestBf(
		{
			url     : `/incident-management/incident/${id}`,
			method  : 'patch',
			authKey : 'patch_incident_management_incident_by_id',
		},
		{ manual: true },
	);

	const successToast = () => {
		Toast.success('Request Updated Sucessfully');
		setDetailsModal(null);
		refetch();
	};

	const onAction = async ({ status }) => {
		try {
			const apiResponse = await trigger({
				data: {
					data: {
						organization         : orgData,
						saasUtrUploadRequest : { ...(saasUtrUploadRequest || {}), utr_details: apiData },
					},
					remark    : remarks,
					status,
					updatedBy : userId,
				},
			});
			const {
				data: { message },
			} = apiResponse;
			if (message === 'Updated Successfully') {
				successToast();
			} else {
				Toast.error(message);
			}
		} catch (e) {
			toastApiError(e);
		}
	};

	return {
		onAction,
		loading,
	};
};

export default useSubscriptionApproval;
