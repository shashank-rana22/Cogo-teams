import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	useRequest, useRequestBf, useAllocationRequest, useTicketsRequest, useAuthRequest,
	useCxAutomationRequest,
} from '@cogoport/request';
import { isEmpty, merge } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import useDebounceQuery from './useDebounceQuery';

const REQUEST_HOOK_MAPPING = {
	business_finance : useRequestBf,
	allocation       : useAllocationRequest,
	tickets          : useTicketsRequest,
	auth             : useAuthRequest,
	cx_automation    : useCxAutomationRequest,
	agent_scoring    : useAllocationRequest,
};

function getOptions({ data = [] }) {
	if (Array.isArray(data)) {
		return data;
	}

	let options = [];

	if (typeof data === 'object' && data) {
		Object.keys(data).some((key) => {
			if (Array.isArray(data[key])) {
				options = data[key];
				return true;
			}
			if (typeof data[key] === 'object') {
				options = getOptions({ data: data[key] });
			}
			return !isEmpty(options);
		});
	}
	return options;
}

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
	let options = getOptions({ data });
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
			let res;
			if (TO_BE_FETCHED.length) {
				res = await triggerSingle({
					params: merge(params, { filters: { [valueKey]: TO_BE_FETCHED } }),
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

		if (!isEmpty(checkOptionsExist)) return checkOptionsExist[GLOBAL_CONSTANTS.zeroth_index];

		try {
			const res = await triggerSingle({
				params: merge(params, (searchByq ? { q: value } : { filters: { [valueKey]: value } })),
			});
			return res?.data?.list?.[GLOBAL_CONSTANTS.zeroth_index] || res?.data?.items?.[GLOBAL_CONSTANTS.zeroth_index]
			|| res?.data?.[GLOBAL_CONSTANTS.zeroth_index] || null;
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
