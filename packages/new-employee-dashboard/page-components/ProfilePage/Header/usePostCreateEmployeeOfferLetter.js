import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

function usePostCreateEmployeeOfferLetter({ setShowCtcBreakupModal, offerLetterApiRefetch }) {
	const [{ loading }, trigger] = useHarbourRequest(
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
				metadata           : combinedObject,
				status             : 'active',
			};

			await trigger({
				data: payload,
			});

			offerLetterApiRefetch();
			Toast.success('Offer Letter initiated!');
			setShowCtcBreakupModal(false);
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
