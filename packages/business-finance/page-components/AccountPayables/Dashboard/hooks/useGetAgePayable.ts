import { useRequestBf } from '@cogoport/request';
import { useEffect, useState } from 'react';
// import React from 'react';

const useGetAgePayable = () => {
	const [filters, setFilters] = useState({
		service  : undefined,
		currency : undefined,
	});

	const {
		service,
		currency,
		...rest
	} = filters || {};
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/purchase/payable/dashboard/age-payable',
			method  : 'get',
			authKey : 'get_purchase_payable/dashboard/age-payable',
		},
		{ manual: true },
	);

	const getDahboardData = async () => {
		try {
			await trigger({
				params: {
					service  : service || undefined,
					currency : currency || undefined,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getDahboardData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(rest), service, currency]);

	return {
		data,
		loading,
		getDahboardData,
		filters,
		setFilters,
	};
};

export default useGetAgePayable;
