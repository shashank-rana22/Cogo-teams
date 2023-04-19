import { useDebounceQuery } from '@cogoport/forms';
import { useTicketsRequest } from '@cogoport/request';
import { useEffect, useState, useMemo } from 'react';

const INITIALIZE_PARAMS = {};
function useGetAsyncTicketOptions({
	endpoint = '',
	initialCall = false,
	valueKey = '',
	labelKey = '',
	params = INITIALIZE_PARAMS,
	authkey = '',
	qFilterKey = 'q',
}) {
	const { query, debounceQuery } = useDebounceQuery();
	const [storeoptions, setstoreoptions] = useState([]);

	const [{ data, loading }] = useTicketsRequest({
		url    : endpoint,
		method : 'GET',
		authkey,
		params : { ...params, [qFilterKey]: query },
	}, { manual: !(initialCall || query) });

	const options = useMemo(() => data?.items || [], [data?.items]);

	const optionValues = useMemo(() => options.map((item) => item[valueKey]), [options, valueKey]);

	const [{ loading: loadingSingle }, triggerSingle] = useTicketsRequest({
		url    : endpoint,
		method : 'GET',
		authkey,
	}, { manual: true });

	useEffect(() => {
		setstoreoptions((p) => [...p, ...options]);
	}, [options, optionValues]);

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
					params: { ...params, [valueKey]: toBeFetched },
				});
				storeoptions.push(...res?.data?.items || []);
			}
			unorderedHydratedValue = unorderedHydratedValue.concat(res?.data?.items || []);

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
				params: { ...params, [valueKey]: value },
			});
			return res?.data?.items?.[0] || null;
		} catch (err) {
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

export default useGetAsyncTicketOptions;
