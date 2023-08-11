import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest, useRequestBf, useAllocationRequest, useTicketsRequest } from '@cogoport/request';
import { isEmpty, merge } from '@cogoport/utils';
import { useEffect, useState } from 'react';

const REQUEST_HOOK_MAPPING = {
	business_finance : useRequestBf,
	allocation       : useAllocationRequest,
	tickets          : useTicketsRequest,
};

function useGetAsyncOptionsMicroservice({
	endpoint = '',
	initialCall = false,
	valueKey = '',
	labelKey = '',
	params = {},
	authkey = '',
	microService = '',
	searchByq,
	qFilterKey = 'q',
	getModifiedOptions,
}) {
	const { query, debounceQuery } = useDebounceQuery();
	const [storeoptions, setstoreoptions] = useState([]);

	const useRequestMicroservice = REQUEST_HOOK_MAPPING[microService] || useRequest;

	const filterQuery = searchByq
		? { [qFilterKey]: query || undefined } : { filters: { [qFilterKey]: query || undefined } };

	const [{ data, loading }] = useRequestMicroservice({
		url    : endpoint,
		method : 'GET',
		authkey,
		params : merge(params, filterQuery),
	}, { manual: !(initialCall || query) });
	let options = data?.list || data?.items || data || [];

	if (typeof getModifiedOptions === 'function' && !isEmpty(options)) {
		options = getModifiedOptions({ options });
	}

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
			const TO_BE_FETCHED = [];
			value.forEach((v) => {
				const singleHydratedValue = storeoptions.find((o) => o?.[valueKey] === v);
				if (singleHydratedValue) {
					unorderedHydratedValue.push(singleHydratedValue);
				} else {
					TO_BE_FETCHED.push(v);
				}
			});
			let unhydratedOptions;
			if (TO_BE_FETCHED.length) {
				const res = await triggerSingle({
					params: merge(params, { filters: { [valueKey]: TO_BE_FETCHED } }),
				});
				unhydratedOptions = res?.data?.list || res?.data?.items || res?.data;
				if (typeof getModifiedOptions === 'function' && !isEmpty(unhydratedOptions)) {
					unhydratedOptions = getModifiedOptions({ options: unhydratedOptions });
				}
				storeoptions.push(...unhydratedOptions || []);
			}
			unorderedHydratedValue = unorderedHydratedValue.concat(unhydratedOptions || []);

			const hydratedValue = value.map((v) => {
				const singleHydratedValue = unorderedHydratedValue.find((uv) => uv?.[valueKey] === v);
				return singleHydratedValue;
			});

			return hydratedValue;
		}

		const checkOptionsExist = options.filter((item) => item[valueKey] === value);

		if (!isEmpty(checkOptionsExist)) return checkOptionsExist[GLOBAL_CONSTANTS.zeroth_index];

		try {
			const res = await triggerSingle({
				params: merge(params, (searchByq ? { q: value } : { filters: { [valueKey]: value } })),
			});
			let unhydratedOptions = res?.data?.list || res?.data?.items || res?.data;
			if (typeof getModifiedOptions === 'function' && !isEmpty(unhydratedOptions)) {
				unhydratedOptions = getModifiedOptions({ options: unhydratedOptions });
			}
			return unhydratedOptions?.[GLOBAL_CONSTANTS.zeroth_index] || null;
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