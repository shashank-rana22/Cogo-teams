import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import toastApiError from '../../commons/toastApiError';

const useUpdateCostApprovalBill = ({ setShowPopover = () => {}, itemData = {}, refetch = () => {} }) => {
	const { user_data: userData } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));

	const { user: { id: userId } = {} } = userData || {};

	const [{ loading }, trigger] = useRequestBf({
		url     : '/purchase/bills/cost-advocate-bill-approve',
		method  : 'PUT',
		authKey : 'put_purchase_bills_cost_advocate_bill_approve',
	}, { manual: true });

	const apiTrigger = async () => {
		try {
			await trigger({
				data: {
					action      : 'approved',
					billId      : itemData?.billId,
					performedBy : userId,
				},
			});
			setShowPopover(false);
			refetch();
			Toast.success('Success');
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		apiTrigger,
		loading,
	};
};
export default useUpdateCostApprovalBill;
