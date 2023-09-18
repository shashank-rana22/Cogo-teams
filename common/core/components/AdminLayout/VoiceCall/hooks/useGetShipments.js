import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const getPayload = ({
	serial_id = '', organization_id = '',
}) => ({
	filters: {
		serial_id            : serial_id || undefined,
		importer_exporter_id : organization_id || undefined,
	},
	user_shipments_required : false,
	page_limit              : 100,
});

const useGetShipments = () => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_shipments_on_feedback',
		method : 'get',
	}, { manual: true });

	const getShipments = useCallback(async ({ serial_id = '', organization_id = '' }) => {
		try {
			await trigger({
				params: getPayload({ serial_id, organization_id }),
			});
		} catch (error) {
			console.error(error);
		}
	}, [trigger]);

	return {
		shipmentLoading : loading,
		shipmentData    : data,
		getShipments,
	};
};
export default useGetShipments;
