import { useRequest, useRequestBf, useAllocationRequest } from '@cogoport/request';
import { merge } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import useDebounceQuery from './useDebounceQuery';

const REQUEST_HOOK_MAPPING = {
	business_finance : useRequestBf,
	allocation       : useAllocationRequest,
};

function useGetAsyncOptionsMicroservice({
	endpoint = '',
	initialCall = false,
	valueKey = '',
	labelKey = '',
	params = {},
	authkey = '',
	microService = '',
}) {
	const { query, debounceQuery } = useDebounceQuery();
	const [storeoptions, setstoreoptions] = useState([]);

	const useRequestMicroservice = REQUEST_HOOK_MAPPING[microService] || useRequest;

	const [{ data, loading }] = useRequestMicroservice({
		url    : endpoint,
		method : 'GET',
		authkey,
		params : merge(params, { filters: { q: query } }),
	}, { manual: !(initialCall || query) });
	const options = data?.list || data || [];

	const optionValues = options.map((item) => item[valueKey]);

	const [{ loading: loadingSingle }, triggerSingle] = useRequestMicroservice({
		url    : endpoint,
		method : 'GET',
		authkey,
	}, { manual: true });
	useEffect(() => {
		storeoptions.push(...options);
		setstoreoptions(storeoptions);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(optionValues)]);

	const onSearch = (inputValue) => {
		debounceQuery(inputValue);
	};

	const onHydrateValue = async (value) => {
		if (Array.isArray(value)) {
			let unorderedHydratedValue = [];
			const toBeFetched = [];
			value.forEach((v) => {
				const singleHydratedValue = storeoptions.find((o) => o?.[valueKey] === v);
				if (singleHydratedValue) {
					unorderedHydratedValue.push(singleHydratedValue);
				} else {
					toBeFetched.push(v);
				}
			});
			let res;
			if (toBeFetched.length) {
				res = await triggerSingle({
					params: merge(params, { filters: { [valueKey]: toBeFetched } }),
				});
				storeoptions.push(...res?.data?.list || []);
			}
			unorderedHydratedValue = unorderedHydratedValue.concat(res?.data?.list || []);

			const hydratedValue = value.map((v) => {
				const singleHydratedValue = unorderedHydratedValue.find((uv) => uv?.[valueKey] === v);
				return singleHydratedValue;
			});

			return hydratedValue;
		}

		const checkOptionsExist = options.filter((item) => item[valueKey] === value);

		if (checkOptionsExist.length > 0) return checkOptionsExist[0];

		try {
			const res = await triggerSingle({
				params: merge(params, { filters: { [valueKey]: value } }),
			});
			return res?.data?.list?.[0] || res?.data?.[0] || null;
		} catch (err) {
			// console.log(err);
			return {};
		}
	};

	return {
		loading: loading || loadingSingle,
		onSearch,
		options,
		labelKey,
		valueKey,
		onHydrateValue,
	};
}

export default useGetAsyncOptionsMicroservice;
