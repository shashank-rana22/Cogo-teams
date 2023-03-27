import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

interface SellerDetails {
	organizationName?:string,
}
interface Row {
	sellerDetails?:SellerDetails,
	category?:string,
	billDate?:Date | number,
	maxPayoutAllowed?:number | string,
	grandTotal?:number,
	approvedBy?:string | number,
}

interface Props {
	rowData?:Row,
	recurringState?:string,
}

const useSendEmail = () => {
	const { profile	} = useSelector((state:any) => state);

	const [{ loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/expense/send-email',
			method  : 'post',
			authKey : 'expense_send_email',
		},
		{ manual: true },
	);

	const sendMail = async ({ rowData, recurringState }:Props) => {
		const { sellerDetails, category, billDate:expenseDate, approvedBy } = rowData || {};
		const { organizationName:vendorName } = sellerDetails || {};

		let payableAmount:number | string;
		if (recurringState === 'recurring') {
			payableAmount = rowData?.maxPayoutAllowed;
		} else if (recurringState === 'nonRecurring') {
			payableAmount = rowData?.grandTotal;
		}

		try {
			const response = await trigger({
				data: {
					stakeholderId : approvedBy,
					userId        : profile?.user?.id,
					approveLink   : '/business-finance/overheads/expenses/response',
					rejectLink    : '/business-finance/overheads/expenses/response',
					vendorName,
					category,
					expenseDate,
					payableAmount, // maxPayoutallowed(for recurring record) and grandtotal(for nonRecurr)
				},
			});
			if (response?.data?.message === 'OK') {
				Toast.success('Email sent successfully');
			}
		} catch (err) {
			console.log(err);
			Toast.error('Something went wrong');
		}
	};

	return {
		sendMail,
		loading,
	};
};

export default useSendEmail;
