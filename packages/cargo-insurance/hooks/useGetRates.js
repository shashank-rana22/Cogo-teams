import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

const getPayload = ({ formValues }) => {
	const { originCountryId, destinationCountryId, hsCode = '', cargoValue = '', currency = '' } = formValues || {};

	return {
		hsCode,
		cargoValue,
		cargoCurrency: currency,
		originCountryId,
		destinationCountryId,
	};
};

const useGetRates = () => {
	const { query } = useRouter();
	const formValues = JSON.parse(query?.data);

	const [selectedRateCard, setSelectedRateCard] = useState({});

	const payload = getPayload({ formValues });

	const [{ loading, data }] = useRequestBf({
		method  : 'get',
		url     : '/saas/insurance/v2/rate',
		authKey : 'get_saas_insurance_v2_rate',
		params  : payload,
	}, { manual: false });

	// const getRates = async () => {
	// 	const payload = getPayload({ formValues });
	// 	try {
	// 		await trigger({
	// 			params: payload,
	// 		});
	// 	} catch (err) {
	// 		// console.log(err, 'get Rates err');
	// 		Toast.error(err.response?.data?.message);
	// 	}
	// };

	// useEffect(() => {
	// 	if (!isEmpty(query?.data)) {
	// 		getRates();
	// 	}
	// }, [query?.data]);

	useEffect(() => {
		if (!isEmpty(data?.list)) {
			setSelectedRateCard(data?.list[GLOBAL_CONSTANTS.zeroth_index]);
		}
	}, [data]);

	return { loading, data: data?.list || [], selectedRateCard, setSelectedRateCard };
};

export default useGetRates;
