import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const getOceanParams = ({
	shipmentId = '',
	trade_type = '',
	organizationId = '',
}) => ({
	filters: {
		organization_id : organizationId,
		shipment_id     : shipmentId,
		trade_type,
		from_checkout   : false,
		mode            : 'ocean',
	},
	org_data_required: false,
});

const MODE_WISE_PAYLOAD_MAPPING = {
	ocean: {
		endpoint  : '/get_shipment_operating_procedure',
		getParams : getOceanParams,
	},
};

const useGetModeSopData = ({
	shipmentData = {},
	mode = '',
}) => {
	const { endpoint = '', getParams = () => {} } = MODE_WISE_PAYLOAD_MAPPING[mode] || MODE_WISE_PAYLOAD_MAPPING.ocean;

	const [{ data, loading }, trigger] = useRequest({
		url: endpoint,
	}, { manual: true });

	const { id: shipmentId, trade_type = '', importer_exporter_id: organizationId = '' } = shipmentData || {};

	const getModeSopData = useCallback(async () => {
		try {
			trigger({
				params: getParams({
					shipmentId,
					trade_type,
					organizationId,
				}),
			});
		} catch (err) {
			console.error('err', err);
		}
	}, [getParams, organizationId, shipmentId, trade_type, trigger]);

	useEffect(() => {
		getModeSopData();
	}, [getModeSopData]);
	return {
		loading,
		data,
	};
};
export default useGetModeSopData;
