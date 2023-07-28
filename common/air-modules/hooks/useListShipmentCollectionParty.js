import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useListShipmentCollectionParty = (allParams, formValues) => {
	const { ...params } = allParams || {};

	const [{ data }, trigger] = useRequest({
		url    : 'list_shipment_collection_party',
		params : {
			filters: {
				...params,
			},
			pagination_data_required : false,
			page_limit               : 10,
		},
	}, { manual: true });

	const apiTrigger = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		if (formValues?.fraud_reason === 'irrelevant_charges-4') {
			apiTrigger();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formValues?.fraud_reason]);

	return {
		list: { data },
		apiTrigger,
	};
};

export default useListShipmentCollectionParty;
