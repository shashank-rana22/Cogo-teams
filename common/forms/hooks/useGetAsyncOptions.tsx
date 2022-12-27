import { useRequest } from '@cogoport/request';
import { merge } from '@cogoport/utils';
import { useCallback } from 'react';

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
	}, { manual: true });

	const onSearch = (inputValue: string) => {
		debounceQuery(inputValue);
	};

	const onHydrateValue = useCallback(async (value: any) => {
		const res = await triggerSingle({
			params: merge(params, { filters: { [valueKey]: value } }),
		});
		//
		console.log('options', { res });
		//
		return { [valueKey]: 'value', [labelKey]: 'Awesome' };
	}, []);

	return {
		loading,
		onSearch,
		options,
		labelKey,
		valueKey,
		onHydrateValue,
	};
}

export default useGetAsyncOptions;
