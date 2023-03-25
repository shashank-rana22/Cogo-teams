import { ShipmentDetailContext } from '@cogoport/context';
import { useRequest } from '@cogoport/request';
import { useEffect, useState, useContext, useCallback } from 'react';

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
				console.log(err);
			}
		})();
	}, [trigger, importer_exporter_id, page, id]);

	useEffect(() => {
		getList();
	}, [getList]);

	return {
		data,
		loading,
		setPage,
		refetch: getList,
	};
};

export default useListTradeDocuments;
