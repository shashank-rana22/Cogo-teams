import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useGetSubscriptionOrder = ({ info = {} }) => {
	const { id } = info || {};
	const [page, setPage] = useState(1);

	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : 'list_saas_checkouts',
	}, { manual: true });

	const getOrder = () => {
		try {
			trigger({
				params: {
					filters: {
						customer_id  : id,
						order_placed : true,
					},
					page,
					page_limit              : 10,
					service_object_required : true,
				},
			});
		} catch (err) {
			if (err.code !== 'ERR_CANCELED') Toast.error(getApiErrorString(err.response?.data));
		}
	};

	useEffect(() => {
		getOrder();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	return {
		getOrder, loading, setPage, data,
	};
};

export default useGetSubscriptionOrder;
