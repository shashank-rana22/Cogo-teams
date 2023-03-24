import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useSendEmail = () => {
	const { profile	} = useSelector((state:any) => state);

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/expense/send-email',
			method  : 'post',
			authKey : 'expense_send_email',
		},
		{ manual: true },
	);

	const sendMail = async ({ rowData, recurringState }) => {
		const { sellerDetails, category, billDate:expenseDate } = rowData || {};
		const { organizationName:vendorName } = sellerDetails || {};

		let payableAmount:number | string;
		if (recurringState === 'recurring') {
			payableAmount = rowData?.maxPayoutAllowed;
		} else if (recurringState === 'nonRecurring') {
			payableAmount = rowData?.grandTotal;
		}

		try {
			await trigger({
				data: {
					stakeholderId : '7c6c1fe7-4a4d-4f3a-b432-b05ffdec3b44',
					userId        : profile?.user?.id,
					approveLink   : '/business-finance/overheads/expenses/response',
					rejectLink    : '/business-finance/overheads/expenses/response',
					vendorName,
					category,
					expenseDate,
					payableAmount, // maxPayoutallowed(for recurring record) and grandtotal(for nonRecurr)
				},
			});
		} catch (err) {
			console.log(err);
		}

		if (data?.message === 'OK') {
			Toast.success('Email sent successfully');
		} else {
			Toast.error('Something went wrong');
		}
	};

	return {
		sendMail,
		loading,
	};
};

export default useSendEmail;
