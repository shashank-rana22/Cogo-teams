import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

function useUpdateOfferLetter(id = '') {
	const [params, setParams] = useState({});
	const userId = useSelector((s) => s?.profile?.user?.id);

	const [finalReview, setFinalReview] = useState('');

	const [{ data, loading }, trigger] = useHarbourRequest(
		{
			method : 'post',
			url    : '/update_employee_offer_letter',
		},
		{ manual: false },
	);

	const onFinalSubmit = async (status) => {
		try {
			const payload = {
				id,
				performed_by_id   : 'user_id',
				performed_by_type : 'agent',
				strip             : false,
				status,
				rejectionReason   : '',
				// document_url      : 'https://cogoport-testing.sgp1.digitaloceanspaces.com/
				// 7ec8639af765db36130fb7c72dce73c1/offerlettersample.pdf',
			};

			await trigger({
				data: payload,
			});

			// Toast.success('Letter initiated!');
		} catch (err) {
			console.log('err :: ', err);
			// Toast.error(
			// 	getApiErrorString(err.response?.data) || 'Something went wrong',
			// );
		}
	};

	return {
		loading,
		data,
		// formProps,
		params,
		setParams,
		onFinalSubmit,
		// finalReview,
		// setFinalReview,
	};
}

export default useUpdateOfferLetter;
