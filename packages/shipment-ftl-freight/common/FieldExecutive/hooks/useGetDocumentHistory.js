import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState, useCallback } from 'react';

import { getFormattedHistoryData } from '../utils/getFormattedHistoryData';

const useGetDocumentsHistory = ({
	shipment_id = '',
	truck_number = '',
	setFormattedList = () => {},
}) => {
	const [initialList, setInitialList] = useState([]);

	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_shipment_field_service_ops_document_history',
		method : 'GET',
	}, { manual: true });

	const getDocumentHistory = useCallback(async () => {
		try {
			await trigger({
				params: { shipment_id, truck_number },
			});
		} catch (error) {
			console.error(error?.data);
		}
	}, [shipment_id, trigger, truck_number]);

	useEffect(() => {
		getDocumentHistory();
	}, [getDocumentHistory]);

	useEffect(() => {
		if (!isEmpty(data)) {
			const finalList = getFormattedHistoryData(data);
			setInitialList(finalList);
			setFormattedList(finalList);
		}
	}, [setFormattedList, data]);

	return {
		getDocumentHistory,
		loading,
		data,
		initialList,
	};
};

export default useGetDocumentsHistory;
