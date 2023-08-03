import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useState } from 'react';

function useUpdateOfferLetter({ refetch, setCtcBreakup = () => {} }) {
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
				status,
				rejection_reason: rejection_reason || undefined,
			};

			await trigger({
				data: payload,
			});

			refetch();
			setCtcBreakup('');
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
