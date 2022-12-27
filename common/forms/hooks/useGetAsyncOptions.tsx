import { useRequest } from '@cogoport/request';
import { merge } from '@cogoport/utils';

import useDebounceQuery from './useDebounceQuery';

interface IUseGetAsyncOptions {
	endpoint?: string;
	initialCall?: boolean;
	valueKey?: string;
	labelKey?: string;
	params?: any;
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

	const onSearch = (inputValue: string) => {
		debounceQuery(inputValue);
	};

	return {
		loading,
		onSearch,
		options,
		labelKey,
		valueKey,
	};
}

export default useGetAsyncOptions;
