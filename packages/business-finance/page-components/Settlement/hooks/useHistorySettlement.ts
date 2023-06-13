import { useRequestBf } from '@cogoport/request';
import { useState } from 'react';

const useHistorySettlemet = () => {
	const [filters, setFilters] = useState({});

	const [{ loading }, trigger] = useRequestBf(
		{
			url     : '/payments/settlement/history',
			authKey : 'get_payments_settlement_history',
			method  : 'get',
		},
		{ manual: true },
	);

	return {
		filters,
		setFilters,
	};
};

export default useHistorySettlemet;
