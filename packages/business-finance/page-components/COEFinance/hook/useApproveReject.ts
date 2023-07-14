import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import { RemarksValInterface } from '../../commons/Interfaces/index';

interface ApproveRejectInterface {
	collectionPartyId?:string
	remarksVal?:RemarksValInterface
	overAllRemark?:string
	modalData?:string
	setApprove: React.Dispatch<React.SetStateAction<boolean>>,
	billId?:string,
	lineItemsRemarks?:object
}

const ApproveReject = ({
	remarksVal, overAllRemark,
	lineItemsRemarks, modalData, setApprove, billId,
}:ApproveRejectInterface) => {
	const router = useRouter();
	const { user_data:userData } = useSelector(({ profile }:any) => ({
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
	const rejectApproveApi = async (getRoute) => {
		try {
			await trigger({
				data: {
					status              : getStatus(),
					id                  : billId,
					updatedBy           : userData?.user?.id,
					performedByUserType : userData?.session_type,
					remarksList         : modalData !== 'Approve' ? remarksVal : undefined,
					remarks             : overAllRemark,
					lineItemsRemarks    : modalData !== 'Approve' ? lineItemsRemarks : undefined,
				},
			});
			setApprove(false);
			Toast.success(`${modalData}Successfully`);
			router.push(
				getRoute()[0],
				getRoute()[1],
			);
		} catch (error:any) {
			Toast.error(error?.response?.data?.message || 'Something went wrong');
		}
	};

	return {
		loading,
		rejectApproveApi,
	};
};

export default ApproveReject;
