import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useGetJvData = ({ refetch, setShowJVModal, journalVoucherRequest, id, remark }) => {
	const { user_id:userId } = useSelector(({ profile }) => ({
		user_id: profile?.user?.id,
	}));

	const [
		{ loading:ApproveLoading },
		ApproveTrigger,
	] = useRequestBf(
		{
			url     : 'payments/journal-voucher/approve',
			method  : 'post',
			authKey : 'post_payments_journal_voucher_approve',
		},
		{ manual: true },
	);

	const [
		{ loading:RejectLoading },
		RejectTrigger,
	] = useRequestBf(
		{
			url     : 'payments/journal-voucher/reject',
			method  : 'post',
			authKey : 'post_payments_journal_voucher_reject',
		},
		{ manual: true },
	);

	const useOnAction = async (status:string) => {
		const api = status === 'APPROVED' ? ApproveTrigger : RejectTrigger;
		const payload =	status === 'APPROVED'
			? {
				incidentId         : id,
				journalVoucherData : {
					...journalVoucherRequest,
				},
				remark,
				performedBy: userId,
			}
			: {
				incidentId       : id,
				journalVoucherId : journalVoucherRequest?.id,
				remark,
				performedBy      : userId,
			};
		try {
			await api({
				data: payload,
			});
			Toast.success('Request Updated Sucessfully');
			setShowJVModal(false);
			refetch();
		} catch (e) {
			Toast.error(e?.response?.data?.message);
		}
	};
	return {
		useOnAction,
		loading: ApproveLoading || RejectLoading,
	};
};

export default useGetJvData;
