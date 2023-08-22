import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import toastApiError from '../../../commons/toastApiError.ts';

const useOverSeasHeader = ({ organizationId }) => {
	const [{ data, loading },
		trigger] = useRequestBf(
		{
			url     : '/purchase/payable-bill/overseas-details',
			method  : 'get',
			authKey : 'get_purchase_payable_bill_overseas_details',
		},
		{ manual: true },
	);

	const overseasHeaderData = useCallback(
		async () => {
			try {
				await trigger({
					params: {
						organization_id: organizationId,
					},
				});
			} catch (err) {
				toastApiError(err);
			}
		},
		[organizationId, trigger],
	);

	useEffect(() => {
		overseasHeaderData();
	}, [overseasHeaderData]);

	return {
		loading,
		data,
		overseasHeaderData,
	};
};

export default useOverSeasHeader;
