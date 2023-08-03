import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

import { getFormattedData } from '../utils/getFormattedData';

const useGetFieldServiceOpsDetails = ({
	shipment_id = '',
	setInitFormattedData = () => {},
	setOtherFormattedData = () => {},
}) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_shipment_field_service_ops_detail',
		method : 'GET',
	}, { manual: true });

	const getDetails = useCallback(async (truck_number) => {
		try {
			await trigger({
				params: { shipment_id, truck_number },
			});
		} catch (error) {
			console.error(error?.data);
		}
	}, [trigger, shipment_id]);

	useEffect(() => {
		if (!isEmpty(data)) {
			const formattedData = getFormattedData(data.data);
			setInitFormattedData(formattedData.data);
			setOtherFormattedData(formattedData.inputData);
		}
	}, [data, setInitFormattedData, setOtherFormattedData]);

	return {
		getDetails,
		loading,
		data,
	};
};

export default useGetFieldServiceOpsDetails;
