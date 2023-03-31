import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

interface SellerDetails {
	organizationName?:string,
}

interface Data {
	expensePeriod?:string,
	recurringAmount?:number | string,
	grandTotal?:number,
	paidAmount?:number | string,
	dueDate?: Date,
	billDate?: Date,
	createdDate?:Date,
	status?: string,
	billNumber?:string | number,
	billDocumentUrl?:string,
	startDate?:Date,
	endDate?:Date,
	maxPayoutAllowed?:number | string,
	currency?:string,
	updatedAt?:Date,
	proofDocuments?:string[],
	createdAt?:Date,
	sellerDetails?:SellerDetails,
	category?:string,
	approvedBy?:string | number,
	approvedByUser?:{ id?:string | number },
	businessName?:string,
	payableAmount?:string | number,

}

interface Props {
	rowData?:Data,
	recurringState?:string,
}

const useSendEmail = () => {
	const { profile	} = useSelector((state:any) => state);

	const [{ loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/expense/send-email',
			method  : 'post',
			authKey : 'post_purchase_expense_send_email',
		},
		{ manual: true },
	);

	const sendMail = async ({ rowData, recurringState }:Props) => {
		const {
			sellerDetails, category, billDate:expenseDate, approvedBy,
			approvedByUser, businessName:recurringVendorName, createdAt,
		} = rowData || {};
		const { organizationName:vendorName } = sellerDetails || {};
		const { id:recurringApprovedBy } = approvedByUser || {};

		let payableAmount:number | string;

		if (recurringState === 'recurring') {
			payableAmount = rowData?.maxPayoutAllowed || rowData?.payableAmount;
		} else if (recurringState === 'nonRecurring') {
			payableAmount = rowData?.grandTotal;
		}

		try {
			const response = await trigger({
				data: {
					stakeholderId : approvedBy || recurringApprovedBy,
					userId        : profile?.user?.id,
					approveLink   : '/business-finance/overheads/expenses/response',
					rejectLink    : '/business-finance/overheads/expenses/response',
					vendorName    : vendorName || recurringVendorName,
					category,
					expenseDate   : expenseDate || createdAt,
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
