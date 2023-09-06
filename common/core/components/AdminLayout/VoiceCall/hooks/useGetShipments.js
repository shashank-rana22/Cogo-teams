import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const getPayload = ({
	serial_id = '', organization_id = '',
}) => ({
	serial_id            : serial_id || undefined,
	importer_exporter_id : organization_id || undefined,
});

const useGetShipments = (values) => {
	const { serial_id = '', organization_id = '' } = values || {};
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_shipments_on_feedback',
		method : 'get',
	}, { manual: true });

	const getShipments = useCallback(async () => {
		try {
			await trigger({
				params: getPayload({ serial_id, organization_id }),
			});
		} catch (error) {
			console.error(error);
		}
	}, [organization_id, serial_id, trigger]);

	return {
		shipmentLoading : loading,
		shipmentData    : data,
		getShipments,
	};
};
export default useGetShipments;
