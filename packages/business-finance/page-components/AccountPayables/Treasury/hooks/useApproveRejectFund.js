import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useApproveRejectFund = ({ item, refetch }) => {
	const { id, requestedAmount } = item || {};

	const { user_data: UserData } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const { user } = UserData;
	const { id: userId = '', name } = user || {};

	const [{ data: allocateFundData, loading: allocateFundLoading },
		allocateFundApi,
	] = useRequestBf(
		{
			url     : 'purchase/treasury/allocate-fund',
			method  : 'post',
			authKey : 'post_purchase_treasury_allocate_fund',
		},
		{ manual: true },
	);
	const onApprove = async (values) => {
		try {
			const payload = {
				fundRequestId   : id,
				allocatedAmount : values.requestedAmount || requestedAmount,
				performedBy     : userId,
				performedByName : name,
			};
			await allocateFundApi({ data: payload });
			Toast.success('Your Request has been Approved!!');
			refetch();
		} catch (e) {
			Toast.error(e?.data?.message);
		}
	};

	const [{ data: rejectFundData, loading: rejectFundLoading },
		rejectFundAPI,
	] = useRequestBf(
		{
			url     : 'purchase/treasury/reject-fund-req',
			method  : 'put',
			authKey : 'put_purchase_treasury_reject_fund_req',
		},
		{ manual: true },
	);

	const onReject = async () => {
		try {
			const payload = {
				fundRequestId   : id,
				performedBy     : userId,
				performedByName : name,
			};
			await rejectFundAPI({ data: payload });
			Toast.success('Your Request has been Rejected!!');
			refetch();
		} catch (e) {
			Toast.error(e?.data?.message);
		}
	};
	return {
		onApprove,
		onReject,
		allocateFundData,
		rejectFundData,
		loadingOnReject  : rejectFundLoading,
		loadingOnApprove : allocateFundLoading,
	};
};
export default useApproveRejectFund;
