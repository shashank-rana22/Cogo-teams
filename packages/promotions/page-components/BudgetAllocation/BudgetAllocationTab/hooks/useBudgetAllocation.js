import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';

import { flattenErrorToString } from '../helpers/error-helper';

const useBudgetAllocation = ({
	FormData = {},
	setShowErrorModal,
	setShowModal,
	refetch,
	showForm,
	reset,
	radioReset,
}) => {
	const formdata = FormData;

	let payload = { ...formdata, role_ids: [formdata.role_ids] };

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/create_promotion_budget_allocation',
			method : 'POST',
			scope  : 'partner',
		},
		{ manual: true },
	);

	const fetchCreateDataApi = async ({ radioValue = '' }) => {
		if (radioValue === 'allocate_budget_after_completion_of_active_budget') {
			payload = { ...payload, overlap_save: 'activate_later' };
		}
		if (radioValue === 'deactivate_the_active_budget_and_allocate') {
			payload = { ...payload, overlap_save: 'activate_now' };
		}
		try {
			await trigger({
				data: {
					...payload,
					budget_amount_currency: GLOBAL_CONSTANTS.currency_code.USD,
				},
			});
			Toast.success('Budget allocated successfully');
			setShowErrorModal(false);
			setShowModal(false);
			refetch();
			showForm();
			reset();
			radioReset();
		} catch (error) {
			if (error !== undefined && error?.data !== undefined) {
				if (error?.data?.budgetRole === 'Budget Role already in queue') {
					Toast.error('Budget Role already in queue');
					setShowErrorModal(false);
					reset();
					radioReset();
					setShowModal(false);
					showForm();
				} else if (error?.data?.budgetRole === 'Budget Role already exist') {
					setShowErrorModal(true);
				} else {
					reset();
					radioReset();
					showForm();
					setShowErrorModal(false);
					setShowModal(false);
					Toast.error(flattenErrorToString(error.error));
				}
			}
		}
	};

	return {
		fetchCreateDataApi,
		loading,
	};
};
export default useBudgetAllocation;
