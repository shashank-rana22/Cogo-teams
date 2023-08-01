import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useGetCheckoutPromocodes = ({ checkout_id }) => {
	const [input, setInput] = useState('');

	const [{ data = {}, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_checkout_applicable_promocodes',
		params : { checkout_id },
	}, { manual: false });

	const getCheckoutPromocodes = () => {
		trigger({ params: { checkout_id, filters: { q: input } } });
	};

	return {
		loading,
		data,
		setInput,
		getCheckoutPromocodes,
		input,
	};
};

export default useGetCheckoutPromocodes;
