import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useApproveConcor = ({
	refetch, setShowModal, id, bookingProof,
	quotation,
	sid,
	totalBuyPrice,
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

	const useOnAction = async (inputValues) => {
		const { utr, paymentProof, remarks, bankId, bankname, bankAccountNo } = inputValues || {};
		try {
			const apiResponse = await trigger({
				data: {
					status : 'APPROVED',
					remark : remarks,
					data   : {
						concorPdaApprovalRequest: {
							sid,
							totalBuyPrice,
							bookingProof,
							quotation,
							bankId,
							bankName         : bankname,
							cogoAccountNo    : bankAccountNo,
							paymentProof,
							transactionRefNo : utr,
						},
					},
					updatedBy: userId,
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
			Toast.error(e?.response?.data?.message || 'Something went wrong');
		}
	};

	return {
		useOnAction,
		loading,
	};
};

export default useApproveConcor;
