import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useGetRevokeInvoiceData = ({
	refetch,
	setShowModal,
	id,
	reqRevokeInvoiceRequest,
	remarks = 'Approved',
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

	const useOnAction = async (status:string) => {
		try {
			const apiResponse = await trigger({
				data: {
					remark    : remarks,
					status,
					updatedBy : userId,
					data      : {
						revokeInvoiceRequest: reqRevokeInvoiceRequest,
					},
				},
			});
			const {
				data: { message },
			} = apiResponse;
			if (message === 'Updated Successfully') {
				Toast.success('Request Updated Sucessfully');
				setShowModal(false);
				refetch();
			} else {
				Toast.error(message);
			}
		} catch (e) {
			Toast.error(e?.response?.data?.message);
		}
	};

	return {
		useOnAction,
		loading,
	};
};

export default useGetRevokeInvoiceData;
