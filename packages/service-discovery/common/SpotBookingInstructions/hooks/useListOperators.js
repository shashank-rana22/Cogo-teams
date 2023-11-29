import { useRequest } from '@cogoport/request';

const useListOperators = ({ shipping_line_ids }) => {
	const [{ loading, data }] = useRequest({
		url    : '/list_operators',
		method : 'get',
		params : {
			filters: {
				operator_type : 'shipping_line',
				status        : 'active',
				id            : shipping_line_ids,
			},
		},
	}, { manual: false });

	return {
		shippingLines: data?.list || [],
		loading,
	};
};

export default useListOperators;
