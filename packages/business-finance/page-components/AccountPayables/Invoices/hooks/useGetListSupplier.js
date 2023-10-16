import { useDebounceQuery } from '@cogoport/forms';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

import toastApiError from '../../../commons/toastApiError';

function useGetListSupplier() {
	const { query: urlQuery = {} } = useSelector(({ general }) => ({
		query: general.query,
	}));
	const {
		payrun = '',
	} = urlQuery || {};
	const [apiData, setApiData] = useState({});
	const [filters, setFilters] = useState({});

	const { search = '' } = filters || {};

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/payrun/list-supplier',
			method  : 'get',
			authKey : 'get_purchase_payrun_list_supplier',
		},
		{ manual: true },
	);

	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);

	useEffect(() => {
		if (payrun) {
			try {
				trigger({ params: { payrunId: payrun, searchType: query || undefined } });
			} catch (e) {
				toastApiError(e);
			}
		}
	}, [payrun, trigger, query]);

	useEffect(() => {
		setApiData(data);
	}, [data]);

	return {
		loading,
		setFilters,
		suppliers: apiData,
		setApiData,
	};
}

export default useGetListSupplier;
