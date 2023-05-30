import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

function usePostCreateEmployeeOfferLetter() {
	const [{ data, loading }, trigger] = useHarbourRequest(
		{
			url    : '/create_employee_offer_letter',
			method : 'POST',
		},
		{ manual: true },
	);

	const onFinalSubmit = async (joiningBonus, salaryDetails, ctc, id) => {
		try {
			const combinedObject = { ...joiningBonus, ...salaryDetails, init: ctc };

			const payload = {
				employee_detail_id : id,
				performed_by_id    : 'user_id',
				performed_by_type  : 'agent',
				metadata           : combinedObject,
				status             : 'active',
			};

			await trigger({
				data: payload,
			});

			Toast.success('Letter initiated!');
		} catch (err) {
			Toast.error(
				getApiErrorString(err.response?.data) || 'Something went wrong',
			);
		}
	};

	return {
		loading,
		onFinalSubmit,
	};
}

export default usePostCreateEmployeeOfferLetter;
