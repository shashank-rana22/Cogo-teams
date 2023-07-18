import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useTicketsRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState, useMemo } from 'react';

import useDebounceQuery from './useDebounceQuery';

function useGetAsyncTicketOptions({
	endpoint = '',
	initialCall = false,
	valueKey = '',
	labelKey = '',
	params = {},
	authkey = '',
	qFilterKey = 'q',
}) {
	const [storeOptions, setStoreOptions] = useState([]);
	const { query, debounceQuery } = useDebounceQuery();

	const [{ data, loading }] = useTicketsRequest({
		url    : endpoint,
		method : 'GET',
		authkey,
		params : { ...params, [qFilterKey]: query },
	}, { manual: !(initialCall || query) });

	const [{ loading: loadingSingle }, triggerSingle] = useTicketsRequest({
		url    : endpoint,
		method : 'GET',
		authkey,
	}, { manual: true });

	const options = useMemo(() => data?.items || [], [data?.items]);

	const optionValues = useMemo(() => options.map((item) => item[valueKey]), [options, valueKey]);

	const onSearch = (inputValue) => {
		debounceQuery(inputValue);
	};

	const onHydrateValue = async (value) => {
		if (Array.isArray(value)) {
			let unOrderedHydratedValue = [];
			const OPTIONS_ARRAY = [];

			value.forEach((v) => {
				const singleHydratedValue = storeOptions.find((o) => o?.[valueKey] === v);
				if (singleHydratedValue) {
					unOrderedHydratedValue.push(singleHydratedValue);
				} else {
					OPTIONS_ARRAY.push(v);
				}
			});
			let res;
			if (OPTIONS_ARRAY.length) {
				res = await triggerSingle({
					params: { ...params, [valueKey]: OPTIONS_ARRAY },
				});
				storeOptions.push(...res?.data?.items || []);
			}
			unOrderedHydratedValue = unOrderedHydratedValue.concat(res?.data?.items || []);

			const hydratedValue = value.map((v) => unOrderedHydratedValue.find((uv) => uv?.[valueKey] === v));

			return hydratedValue;
		}

		const checkOptionsExist = options.filter((item) => item[valueKey] === value);

		if (!isEmpty(checkOptionsExist)) return checkOptionsExist[GLOBAL_CONSTANTS.zeroth_index];

		try {
			const res = await triggerSingle({
				params: { ...params, [valueKey]: value },
			});
			return res?.data?.items?.[GLOBAL_CONSTANTS.zeroth_index] || null;
		} catch (err) {
			return {};
		}
	};

	useEffect(() => {
		setStoreOptions((p) => [...p, ...options]);
	}, [options, optionValues]);

	return {
		loading: loading || loadingSingle,
		onSearch,
		options,
		labelKey,
		valueKey,
		onHydrateValue,
	};
}

export default useGetAsyncTicketOptions;
