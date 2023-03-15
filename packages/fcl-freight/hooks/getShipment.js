/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

function useGetShipment() {
	const { id } = useSelector(({ general }) => ({ id: general?.query?.id || '' }));

	const [{ loading : isGettingShipment, data }, trigger] = useRequest({
		url    : 'get_shipment',
		method : 'GET',
	}, { manual: true });

	const getShipment = async () => {
		try {
			const res = await trigger({
				params: {
					id,
				},
			});
			if (res.hasError) {
				Toast.error(getApiErrorString(res?.messages));
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (id) {
			getShipment();
		}
	}, [id]);

	return {
		isGettingShipment,
		refetch : getShipment,
		data    : {
			primary_service : data?.primary_service_detail,
			shipment_data   : data?.summary,
		},
	};
}

export default useGetShipment;
