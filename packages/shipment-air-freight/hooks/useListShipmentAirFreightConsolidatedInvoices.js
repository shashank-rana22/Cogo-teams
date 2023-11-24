import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useListShipmentAirFreightConsolidatedInvoices = ({
	type = 'terminal',
	localServiceId = '', mainServicesData = {},
}) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_shipment_air_freight_consolidated_invoices',
		method : 'GET',
	}, { manual: true });

	const listShipmentConsolidatedInvoices = useCallback(() => {
		(
			async () => {
				try {
					await trigger({
						params: {
							filters: {
								shipment_id  : mainServicesData?.shipment_id,
								service_id   : localServiceId,
								service_type : 'air_freight_local_service',
								code         : type === 'terminal' ? 'THC' : 'GIC',
							},
						},
					});
				} catch (err) {
					toastApiError(err);
				}
			}
		)();
	}, [localServiceId, mainServicesData?.shipment_id, trigger, type]);

	useEffect(() => {
		listShipmentConsolidatedInvoices();
	}, [listShipmentConsolidatedInvoices]);

	return {
		loading,
		data,
		listShipmentConsolidatedInvoices,
	};
};

export default useListShipmentAirFreightConsolidatedInvoices;
