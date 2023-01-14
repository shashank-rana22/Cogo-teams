import { useRequest } from '@cogoport/request';
import { merge } from '@cogoport/utils';

import useDebounceQuery from './useDebounceQuery';

function useGetAsyncOptions({
	endpoint = '',
	initialCall = false,
	valueKey = '',
	labelKey = '',
	params = {},
}) {
	const { query, debounceQuery } = useDebounceQuery();

	const [{ data, loading }] = useRequest({
		url    : endpoint,
		method : 'GET',
		params : merge(params, { filters: { q: query } }),
	}, { manual: !(initialCall || query) });
	const options = data?.list || [];

	const [{ loading: loadingSingle }, triggerSingle] = useRequest({
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

<<<<<<< HEAD
			if (value.length > 0) {
				const res = await triggerSingle({
					params: merge(params, { filters: { [valueKey]: value } }),
				});
				return res?.data?.list || res?.list || [];
			}
			return [];
=======
			return hydratedValue;
>>>>>>> 413bdc718f278499d8ed8cd97b0845b086f58185
		}

		const checkOptionsExist = options.filter((item) => item[valueKey] === value);

		if (checkOptionsExist.length > 0) return checkOptionsExist[0];

		try {
			const res = await triggerSingle({
				params: merge(params, { filters: { [valueKey]: value } }),
			});
			return res?.data?.list?.[0] || null;
		} catch (err) {
			console.log(err);
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
