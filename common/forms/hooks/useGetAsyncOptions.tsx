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
		method : 'GET',
		url    : endpoint,
		params : merge(params, { filters: { q } }),
	}, { manual: !(initialCall || q) });

	const options = data?.list || [];

	const onSearch = (inputValue: any) => {
		console.log({ inputValue });
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
