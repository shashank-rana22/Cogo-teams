import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

function useCreateRaiseQuery({
	handleRaisedQuery = () => {},
	shipmentId = '',
}) {
	const { userId } = useSelector(({ profile }) => ({
		userId: profile.id,
	}));

	const [{ loading }, trigger] = useRequest({
		url    : 'raise_query',
		method : 'POST',
	}, { manual: true });

	const handleFormSubmit = useCallback(async (values) => {
		const { query_type, remarks } = values || {};
		const payload = {
			query_type,
			remarks,
			performed_by_id : userId,
			service         : 'shipment',
			service_id      : shipmentId,
		};

		try {
			await trigger({
				data: payload,
			});

			handleRaisedQuery();
		} catch (e) {
			toastApiError(e);
		}
	}, [userId, shipmentId, trigger, handleRaisedQuery]);

	return {
		loading,
		handleFormSubmit,
	};
}

export default useCreateRaiseQuery;
