import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useState } from 'react';

const NUMBER_OF_MONTHS = 12;

function usePostCreateEmployeeOfferLetter({ setShowCtcBreakupModal, offerLetterApiRefetch }) {
	const [shareOfferLetter, setShareOfferLetter] = useState(false);
	const [offerLetterError, setOfferLetterError] = useState(false);

	const [{ loading }, trigger] = useHarbourRequest(
		{
			url    : '/create_employee_offer_letter',
			method : 'POST',
		},
		{ manual: true },
	);

	const onFinalSubmit = async (values, salaryDetails, ctc, id) => {
		if (typeof shareOfferLetter === 'boolean') {
			Toast.error('Kindly fill Share Offer Letter before submitting');
			return;
		}

		try {
			const combinedObject = {
				...values,
				...salaryDetails,
				init         : ctc,
				init_monthly : ctc / NUMBER_OF_MONTHS,
			};

			const payload = {
				employee_detail_id         : id,
				metadata                   : combinedObject,
				status                     : 'active',
				is_offer_letter_applicable : shareOfferLetter === 'yes',
				retention                  : values.retention,
				joining_bonus              : values.JoiningBonus,
				base_ctc                   : ctc,
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
		setShareOfferLetter,
		shareOfferLetter,
		offerLetterError,
		setOfferLetterError,
	};
}

export default usePostCreateEmployeeOfferLetter;
