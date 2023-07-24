import { ShipmentDetailContext } from '@cogoport/context';
import { useRequest } from '@cogoport/request';
import { useContext, useEffect, useState, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetShipmentFaultAlarmDescription = (alarmId, reload) => {
	const { shipment_data } = useContext(ShipmentDetailContext);
	const [apiData, setApiData] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : 'get_shipment_fault_alarm_description',
		method : 'GET',
		params : {
			shipment_id: shipment_data?.id,
		},
	}, { manual: true });

	const getShipmentFaultAlarmDescription = useCallback(async () => {
		try {
			const res = await trigger();
			setApiData(res.data || {});
		} catch (err) {
			setApiData({});
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		if (shipment_data?.id) {
			getShipmentFaultAlarmDescription();
		}
	}, [shipment_data, getShipmentFaultAlarmDescription, alarmId, reload]);

	return {
		loading,
		data    : apiData,
		refetch : getShipmentFaultAlarmDescription,
	};
};

export default useGetShipmentFaultAlarmDescription;
