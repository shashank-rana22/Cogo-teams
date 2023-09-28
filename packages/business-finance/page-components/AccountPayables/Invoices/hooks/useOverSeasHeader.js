import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import toastApiError from '../../../commons/toastApiError.ts';

const useOverSeasHeader = ({ organizationId:organization_id = '' }) => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/payable-bill/overseas-details',
			method  : 'get',
			authKey : 'get_purchase_payable_bill_overseas_details',
			params  : { organization_id },
		},
		{ manual: true },
	);

	const overseasHeaderData = useCallback(
		async () => {
			try {
				if (organization_id) {
					await trigger();
				}
			} catch (err) {
				toastApiError(err);
			}
		},
		[trigger, organization_id],
	);

	useEffect(() => {
		overseasHeaderData();
	}, [overseasHeaderData, organization_id]);

	return {
		loading,
		data,
		overseasHeaderData,
	};
};

export default useOverSeasHeader;
