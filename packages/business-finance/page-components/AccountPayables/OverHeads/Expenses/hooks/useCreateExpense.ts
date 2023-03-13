import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

const useCreateExpense = (nonRecurringData) => {
	const [{ loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/expense',
			method  : 'post',
			authKey : 'post_purchase_expense',
		},
		{ autoCancel: false },
	);

	const submitData = async () => {
		try {
			const response = await trigger({
				payload: 'payload',
			});
		} catch (err) {
			Toast.error('Something went wrong');
		}
	};
	return {
		loading,
		submitData,
	};
};

export default useCreateExpense;
