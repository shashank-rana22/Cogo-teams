import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';

import { flattenErrorToString } from '../helpers/error-helper';

const useBudgetAllocation = ({
	formData = {},
	setShowErrorModal = () => {},
	setShowModal = () => {},
	refetch = () => {},
	setShowAllocationCard = () => {},
	reset = () => {},
	radioReset = () => {},
}) => {
	let payload = { ...formData, role_ids: [formData.role_ids] };

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/create_promotion_budget_allocation',
			method : 'POST',
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
			setShowAllocationCard((state) => !state);
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
					setShowAllocationCard((state) => !state);
				} else if (error?.data?.budgetRole === 'Budget Role already exist') {
					setShowErrorModal(true);
				} else {
					reset();
					radioReset();
					setShowAllocationCard((state) => !state);
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
