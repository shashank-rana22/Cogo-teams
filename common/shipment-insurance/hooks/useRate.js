import { useDebounceQuery } from '@cogoport/forms';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const getPayload = ({ cargoDetails = {}, getValues }) => {
	const { originCountryId, destinationCountryId } = cargoDetails || {};
	const [currency, cargoValue, commodity] = getValues(['currency', 'cargoValue', 'commodity']);

	return {
		originCountryId,
		destinationCountryId,
		invoiceCurrency   : currency,
		policyCommodityId : commodity,
		invoiceValue      : cargoValue,
	};
};

const useRate = ({ cargoDetails = {}, formHook }) => {
	const { watch, getValues } = formHook || {};

	const { query, debounceQuery } = useDebounceQuery();

	const [currency, cargoValue, commodity] = watch(['currency', 'cargoValue', 'commodity']);

	const [{ loading, data }, trigger] = useRequestBf({
		method  : 'get',
		url     : '/saas/insurance/v2/rate',
		authKey : 'get_saas_insurance_v2_rate',
	}, { manual: true });

	const getInsuranceRate = useCallback(() => {
		const payload = getPayload({ cargoDetails, getValues });

		try {
			trigger({
				params: payload,
			});
		} catch (err) {
			console.log(err);
		}
	}, [cargoDetails, getValues, trigger]);

	useEffect(() => {
		if (cargoValue !== undefined && cargoValue !== null) {
			debounceQuery(cargoValue);
		}
	}, [cargoValue, debounceQuery]);

	useEffect(() => {
		if (currency && commodity && query) {
			getInsuranceRate();
		}
	}, [currency, commodity, query, getInsuranceRate]);

	return {
		loading, data: data?.list || [],
	};
};

export default useRate;
