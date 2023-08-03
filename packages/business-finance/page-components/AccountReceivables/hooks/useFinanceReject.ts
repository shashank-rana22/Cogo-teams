import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

interface FinanceInterface {
	id?: string,
	textValue?: string,
	refetch?: Function
}

const useFinanceReject = ({ id, textValue, refetch }: FinanceInterface) => {
	const { user_profile: UserProfile = {} } = useSelector(({ profile }) => ({
		user_profile: profile,
	}));

	const { user = {}, session_type: SessionType = '' } = UserProfile;

	const { id: userId = '' } = user;

	const [
		{ data, loading },
		financeRejectTrigger,
	] = useRequestBf(
		{
			url     : '/sales/invoice/finance-reject-invoice',
			method  : 'put',
			authKey : 'put_sales_invoice_finance_reject_invoice',
		},
		{ manual: true },
	);

	const financeReject = async () => {
		try {
			const resp = await financeRejectTrigger({
				data: {
					invoiceId       : id,
					rejectionReason : textValue,
					updatedBy       : userId,
					performedByUserType:
					SessionType === 'partner' ? 'AGENT' : 'USER',
				},
			});
			if (resp.status === 200) {
				Toast.success('Invoice Rejected Successfully');
			}
			refetch();
		} catch (err) {
			Toast.error(err?.response?.data?.message || 'Something went wrong');
		}
	};

	return {
		financeReject,
		data,
		loading,
	};
};

export default useFinanceReject;
