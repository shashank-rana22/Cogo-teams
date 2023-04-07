import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback } from 'react';

import getApiErrorString from '../utils/getApiErrorString';

function useCreateRaiseQuery({
	handleRaisedQuery = () => {},
	shipmentId = '',
	queryType = '',
	remarks = '',
}) {
	const { userId } = useSelector(({ profile }) => ({
		userId: profile.id,
	}));

	const [{ loading }, trigger] = useRequest({
		url    : 'raise_query',
		method : 'POST',
	}, { manual: true });

	const handleFormSubmit = useCallback(() => {
		(async () => {
			const payload = {
				query_type      : queryType,
				remarks,
				performed_by_id : userId,
				service         : 'shipment',
				service_id      : shipmentId,
			};
			try {
				const res = await trigger({
					data: payload,
				});

				if (!res.hasError) {
					handleRaisedQuery();
				}
			} catch (e) {
				Toast.error(getApiErrorString(e));
			}
		})();
	}, [queryType, remarks, userId, shipmentId, trigger, handleRaisedQuery]);

	return {
		loading,
		handleFormSubmit,
	};
}

export default useCreateRaiseQuery;
