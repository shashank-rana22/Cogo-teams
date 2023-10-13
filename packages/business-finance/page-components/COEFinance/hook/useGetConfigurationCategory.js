import { useTicketsRequest } from '@cogoport/request';
import { useEffect } from 'react';

import toastApiError from '../../commons/toastApiError';

const useGetConfigurationCategory = (shipmentData = {}) => {
	const [{ data, loading }, trigger] = useTicketsRequest({
		url     : '/configuration_categories',
		method  : 'get',
		authkey : 'get_tickets_configuration_categories',
	}, { manual: true });

	const getConfigurationCategory = async () => {
		try {
			trigger({
				params: {
					Service          : shipmentData?.shipment_type || undefined,
					TradeType        : shipmentData?.trade_type || undefined,
					RequestType      : 'shipment' || undefined,
					CategoryDeskType : 'by_desk',
					QFilter          : 'Auditor',

				},
			});
		} catch (err) {
			toastApiError(err);
		}
	};

	useEffect(() => {
		if (shipmentData) {
			getConfigurationCategory();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(shipmentData)]);

	return {
		data,
		loading,
	};
};

export default useGetConfigurationCategory;
