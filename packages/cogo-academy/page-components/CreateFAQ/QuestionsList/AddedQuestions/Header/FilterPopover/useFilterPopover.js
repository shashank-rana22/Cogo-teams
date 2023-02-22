import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useFilterPopover = () => {
	const [showFilter, setShowFilter] = useState(false);

	const [{ data }] = useRequest({
		method : 'get',
		url    : '/get_faq_topic',
	}, { manual: false });

	console.log('data :: ', data);

	return {
		showFilter,
		setShowFilter,
	};
};

export default useFilterPopover;
