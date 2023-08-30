import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

import { getFormattedData } from '../utils/getFormattedData';

const useGetFieldServiceOpsDetails = ({
	shipment_id = '',
	setInitFormattedData = () => {},
	setOtherFormattedData = () => {},
	setTruckType = () => {},
}) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_shipment_field_service_ops_detail',
		method : 'GET',
	}, { manual: true });

	const getDetails = useCallback(async (truck_number) => {
		try {
			const resp = await trigger({
				params: { shipment_id, truck_number },
			});
			setTruckType(resp?.data?.data?.truck_type ?? null);
		} catch (error) {
			toastApiError(error);
		}
	}, [trigger, shipment_id, setTruckType]);

	useEffect(() => {
		if (!isEmpty(data)) {
			const formattedData = getFormattedData(data.data);
			setInitFormattedData(formattedData.data);
			setOtherFormattedData(formattedData.inputData);
		} else {
			setInitFormattedData({});
			setOtherFormattedData({});
		}
	}, [data, setInitFormattedData, setOtherFormattedData]);

	return {
		getDetails,
		loading,
		data,
	};
};

export default useGetFieldServiceOpsDetails;
