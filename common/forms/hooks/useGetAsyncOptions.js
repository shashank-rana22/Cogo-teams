import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { isEmpty, merge } from '@cogoport/utils';
import { useEffect, useState, useCallback, useRef } from 'react';

import useDebounceQuery from './useDebounceQuery';

function useGetAsyncOptions({
	endpoint = '',
	initialCall = false,
	valueKey = '',
	labelKey = '',
	params = {},
	onOptionsChange = () => {},
	getModifiedOptions,
}) {
	const { query, debounceQuery } = useDebounceQuery();
	const [storeoptions, setstoreoptions] = useState([]);

	const [{ data, loading }] = useRequest({
		url    : endpoint,
		method : 'GET',
		params : merge(params, { filters: { q: query || undefined } }),
	}, { manual: !(initialCall || query) });
	let options = data?.list || [];

	if (typeof getModifiedOptions === 'function' && !isEmpty(options)) {
		options = getModifiedOptions({ options });
	}

	const optionValues = options.map((item) => item[valueKey]);

	const [{ data:listData, loading: loadingSingle }, triggerSingle] = useRequest({
		url    : endpoint,
		method : 'GET',
	}, { manual: true });

	useEffect(() => {
		storeoptions.push(...options);
		setstoreoptions(storeoptions);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(optionValues)]);

	const onOptionsChangeRef = useRef(onOptionsChange);

	const handleOptions = useCallback(
		(list) => { onOptionsChangeRef?.current(list); },
		[onOptionsChangeRef],
	);

	useEffect(() => {
		handleOptions(listData?.list || []);
	}, [listData?.list, handleOptions]);

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
				unhydratedOptions = res?.data?.list;
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
				params: merge(params, { filters: { [valueKey]: value } }),
			});
			let unhydratedOptions = res?.data?.list;
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

export default useGetAsyncOptions;
