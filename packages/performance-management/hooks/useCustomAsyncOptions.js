import { useDebounceQuery } from '@cogoport/forms';
import { useIrisRequest } from '@cogoport/request';
import { merge } from '@cogoport/utils';

function useGetCustomAsyncOptions({
	endpoint = '',
	initialCall = false,
	valueKey = '',
	labelKey = '',
	filterKey = '',
	params = {},
}) {
	const { query, debounceQuery } = useDebounceQuery();

	const [{ data, loading }] = useIrisRequest({
		url    : endpoint,
		method : 'GET',
		params : merge(params, { [filterKey]: query }),
	}, { manual: !(initialCall || query) });
	const options = data?.list || [];

	const [{ loading: loadingSingle }, triggerSingle] = useIrisRequest({
		url    : endpoint,
		method : 'GET',
	}, { manual: true });

	const onSearch = (inputValue) => {
		debounceQuery(inputValue);
	};

	const onHydrateValue = async (value) => {
		if (Array.isArray(value)) {
			let unorderedHydratedValue = [];
			const toBeFetched = [];
			value.forEach((v) => {
				const singleHydratedValue = options.find((o) => o?.[valueKey] === v);
				if (singleHydratedValue) {
					unorderedHydratedValue.push(singleHydratedValue);
				} else {
					toBeFetched.push(v);
				}
			});
			const res = await triggerSingle({
				params: merge(params, { filters: { [valueKey]: toBeFetched } }),
			});
			unorderedHydratedValue = unorderedHydratedValue.concat(res?.data?.list || []);

			const hydratedValue = value.map((v) => {
				const singleHydratedValue = unorderedHydratedValue.find((uv) => uv?.[valueKey] === v);
				return singleHydratedValue;
			});

			return hydratedValue;
		}

		const checkOptionsExist = options.filter((item) => item[valueKey] === value);

		if (checkOptionsExist.length > 0) return checkOptionsExist[0];

		const res = await triggerSingle({
			params: merge(params, { [valueKey]: value }),
		});
		return res?.data?.list?.[0] || null;
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

export default useGetCustomAsyncOptions;
