import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useApproveReject = ({
	remarksVal, overAllRemark,
	lineItemsRemarks, modalData, setApprove, billId,
}) => {
	const router = useRouter();
	const { user_data:userData } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));

	const getStatus = () => {
		if (modalData === 'Approve') {
			return 'FINANCE_ACCEPTED';
		}
		if (modalData === 'Hold') {
			return 'ON_HOLD';
		}
		if (modalData === 'Reject') {
			return 'COE_REJECTED';
		}
		return null;
	};

	const [
		{ loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/purchase/bills/status',
			method  : 'put',
			authKey : 'put_purchase_bills_status',
		},
		{ autoCancel: false },
	);
	const rejectApproveApi = async ({ getRoute, isAdditional = false, additionalRemarks = {}, otherRemarks = '' }) => {
		try {
			await trigger({
				data: {
					status              : getStatus(),
					id                  : billId,
					updatedBy           : userData?.user?.id,
					performedByUserType : userData?.session_type,
					remarksList         : modalData !== 'Approve' ? remarksVal : undefined,
					remarks             : overAllRemark || otherRemarks,
					lineItemsRemarks    : modalData !== 'Approve' ? lineItemsRemarks : undefined,
					additionalRemarks   : isAdditional ? additionalRemarks : undefined,
				},
			});
			setApprove(false);
			Toast.success(`${modalData}Successfully`);
			router.push(
				getRoute()[0],
				getRoute()[1],
			);
		} catch (error) {
			Toast.error(error?.response?.data?.message || 'Something went wrong');
		}
	};

	return {
		loading,
		rejectApproveApi,
	};
};

export default useApproveReject;
