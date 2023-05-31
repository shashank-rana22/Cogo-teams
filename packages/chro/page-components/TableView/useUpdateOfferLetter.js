import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useState } from 'react';

function useUpdateOfferLetter() {
	const [params, setParams] = useState({});

	const [{ data, loading }, trigger] = useHarbourRequest(
		{
			method : 'post',
			url    : '/update_employee_offer_letter',
		},
		{ manual: true },
	);

	const onFinalSubmit = async ({ id, status, rejection_reason }) => {
		try {
			const payload = {
				id,
				performed_by_id   : 'user_id',
				performed_by_type : 'agent',
				status,
				rejection_reason  : rejection_reason || undefined,
			};

			await trigger({
				data: payload,
			});
		} catch (err) {
			Toast.error(
				getApiErrorString(err.response?.data) || 'Something went wrong',
			);
		}
	};

	return {
		loading,
		data,
		params,
		setParams,
		onFinalSubmit,
	};
}

export default useUpdateOfferLetter;
