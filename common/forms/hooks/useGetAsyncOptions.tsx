import { useRequest } from '@cogoport/request';
import { merge } from '@cogoport/utils';
import { useState } from 'react';

function useGetAsyncOptions({
	endpoint,
	initialCall = false,
	valueKey = '',
	labelKey = '',
	params = {},
}: any) {
	const [q, setQ] = useState('');

	const [{ data, loading }] = useRequest({
		url    : endpoint,
		method : 'GET',
		params : merge(params, { filters: { q } }),
	}, { manual: !(initialCall || q) });

	const options = data?.list || [];

	const onSearch = (inputValue: string) => {
		setQ(inputValue);
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
