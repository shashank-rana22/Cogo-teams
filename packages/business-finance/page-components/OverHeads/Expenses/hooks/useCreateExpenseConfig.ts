import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import { formatDate } from '../../../commons/utils/formatDate';

const useCreateExpenseConfig = ({ mailData, setShowModal, getRecurringList }) => {
	const {
		expenseCategory,
		expenseSubCategory,
		stakeholderId,
		branch,
		vendorName,
		repeatEvery,
		vendorID,
		vendorSerialId,
		vendorData,
		entityObject,
		payableAmount,
		currency,
		startDate,
		endDate,
		uploadedInvoice,
		agreementNumber,
		tradeParty,
	} = mailData || {};

	const { branchId } = JSON.parse(branch || '{}');
	const { registration_number:registrationNumber } = vendorData || {};
	const { id:cogoEntityId } = entityObject || {};
	const { organization_trade_party_detail_id:tradePartyDetailId } = tradeParty || {};

	const {
		profile,
	} = useSelector((state:any) => state);

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/expense/expense-configuration',
			method  : 'post',
			authKey : 'post_purchase_expense_expense_configuration',
		},
		{ manual: true },
	);

	const createRecurring = async () => {
		try {
			await trigger({
				data: {
					category             : (expenseCategory || '').toUpperCase(),
					subCategory          : (expenseSubCategory || '').toUpperCase(),
					approvedBy           : stakeholderId,
					branchId,
					businessName         : vendorName,
					organizationSerialId : vendorSerialId,
					registrationNumber,
					repeatFrequency      : repeatEvery,
					vendorId             : vendorID,
					cogoEntityId,
					maxPayoutAllowed     : payableAmount,
					currency,
					startDate            : formatDate(startDate, 'yyyy-MM-dd hh:mm:ss', {}, false),
					endDate              : formatDate(endDate, 'yyyy-MM-dd hh:mm:ss', {}, false),
					proofDocuments       : uploadedInvoice,
					createdBy            : profile?.user?.id,
					updatedBy            : profile?.user?.id,
					agreementNumber,
					tradePartyDetailId,
				},
			});
		} catch (err) {
			Toast.error('Something went wrong');
		}
	};

	if (data?.message === 'OK') {
		Toast.success('Expense successfully created');
		getRecurringList();
		setShowModal(false);
	}

	return {
		createRecurring,
		recurringLoading: loading,
	};
};

export default useCreateExpenseConfig;
