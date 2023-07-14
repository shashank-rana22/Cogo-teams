import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const usePostExpense = ({
	refetch,
	setShowModal,
	id,
	remark,
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

	const useOnAction = async (status: string) => {
		try {
			const apiResponse = await trigger({
				data: {
					remark    : remark || 'Approved',
					status,
					updatedBy : userId,
				},
			});
			const {
				data: { message },
			} = apiResponse;
			if (message === 'Updated Successfully') {
				toastApiError('Request Updated Sucessfully');
				setShowModal(false);
				refetch();
			} else {
				toastApiError(message);
			}
		} catch (e) {
			toastApiError(e?.response?.data?.message);
		}
	};

	return {
		useOnAction,
		loading,
	};
};

export default usePostExpense;
