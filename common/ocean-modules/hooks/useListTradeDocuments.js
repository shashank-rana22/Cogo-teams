import { Toast } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useRequest } from '@cogoport/request';
import { useState, useContext, useCallback } from 'react';

import getApiErrorString from '../utils/getApiErrorString';

const useListTradeDocuments = () => {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const { importer_exporter_id = '', id = '' } = shipment_data;

	const [page, setPage] = useState(1);

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_trade_documents',
		method : 'GET',
	}, { manual: true });

	const getList = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						page,
						filters: {
							status          : ['accepted'],
							organization_id : importer_exporter_id,
							shipment_id     : id || undefined,
						},
					},
				});
			} catch (err) {
				Toast.error(getApiErrorString(err));
			}
		})();
	}, [trigger, importer_exporter_id, page, id]);

	return {
		data,
		loading,
		setPage,
	 getList,
	};
};

export default useListTradeDocuments;
