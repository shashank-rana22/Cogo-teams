import { useRequest } from '@cogoport/request';
import { merge } from '@cogoport/utils';

import useDebounceQuery from './useDebounceQuery';

interface IUseGetAsyncOptions {
	endpoint?: string;
	initialCall?: boolean;
	valueKey?: string;
	labelKey?: string;
	params?: Object;
}

function useGetAsyncOptions({
	endpoint = '',
	initialCall = false,
	valueKey = '',
	labelKey = '',
	params = {},
}: IUseGetAsyncOptions) {
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
	}, { manual: true, autoCancel: false });

	const onSearch = (inputValue: string | undefined) => {
		debounceQuery(inputValue);
	};

	const onHydrateValue = async (value: string[] | string) => {
		if (Array.isArray(value)) {
			// const res = await triggerSingle({
			// 	params: merge(params, { filters: { [valueKey]: value } }),
			// });
			// return res?.data?.list || [];

			// const checkArrayExistInArray = value.map((item) => console.log(item, options));
			// console.log('checkOptionsExistArrAS', checkArrayExistInArray);
			return [];
		}
		const checkOptionsExist = options.filter((item: any) => item[valueKey] === value);

		if (checkOptionsExist.length > 0) return checkOptionsExist?.[0];

		const res = await triggerSingle({
			params: merge(params, { filters: { [valueKey]: value } }),
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

export default useGetAsyncOptions;
