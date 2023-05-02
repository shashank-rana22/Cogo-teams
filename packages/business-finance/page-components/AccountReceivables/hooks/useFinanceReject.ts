import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useFinanceReject = ({ id, textValue, refetch }) => {
	const { user_profile } = useSelector(({ profile }) => ({
		user_profile: profile,
	}));

	const [
		{ data, loading },
		financeRejectTrigger,
	] = useRequestBf(
		{
			url     : '/sales/invoice/finance-reject-invoice',
			method  : 'post',
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
					updatedBy       : user_profile?.id,
					performedByUserType:
						user_profile.session_type === 'partner' ? 'AGENT' : 'USER',
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
