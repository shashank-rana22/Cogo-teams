import { Toast } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useRequest } from '@cogoport/request';
import { useEffect, useState, useContext, useCallback } from 'react';

import getApiErrorString from '../utils/getApiErrorString';

const apis = {
	trade_documents        : '/list_trade_documents',
	organization_documents : '/list_organization_documents',
};

const useListWallet = ({ activeWallet }) => {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const { importer_exporter_id = '', id = '' } = shipment_data;

	const [page, setPage] = useState(1);
	const api = apis[activeWallet];

	const [{ loading, data }, trigger] = useRequest({
		url    : api,
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
							shipment_id     : activeWallet === 'trade_documents' ? id : undefined,
						},
					},
				});
			} catch (err) {
				Toast.error(getApiErrorString(err));
			}
		})();
	}, [trigger, importer_exporter_id, page]);

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

export default useListWallet;
// TODO
