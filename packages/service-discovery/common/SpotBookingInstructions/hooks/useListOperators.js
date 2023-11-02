import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useRequest } from '@cogoport/request';

const geo = getGeoConstants();

const useListOperators = () => {
	const [{ loading, data }] = useRequest({
		url    : '/list_operators',
		method : 'get',
		params : {
			filters: {
				operator_type : 'shipping_line',
				status        : 'active',
				id            : geo.uuid.spot_booking_shipping_lines || [],
			},
		},
	}, { manual: false });

	return {
		shippingLines: data?.list || [],
		loading,
	};
};

export default useListOperators;
