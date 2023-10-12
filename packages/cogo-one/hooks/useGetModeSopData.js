import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
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

const getListParams = ({
	shipmentId = '',
	organizationId = '',
}) => ({
	filters: {
		organization_id : organizationId,
		shipment_id     : shipmentId,
	},
	page_limit: 100,
});

const oceanFormatter = ({ data = {} }) => {
	const { operating_instructions = [], operating_procedure = {} } = data || {};

	return {
		data        : operating_instructions.filter((item) => item?.instruction === 'additional_preference'),
		procedureId : operating_procedure?.id,
	};
};

const listDataFormatter = ({ data = {} }) => {
	const { list = [] } = data || {};
	const ccsNotesInstructions = list?.find((item) => item?.heading === 'CCS Team Notes') || {};

	if (isEmpty(ccsNotesInstructions)) {
		return {
			data        : [],
			procedureId : '',
		};
	}

	return {
		data        : ccsNotesInstructions.instructions || [],
		procedureId : ccsNotesInstructions.id || '',
	};
};

const MODE_WISE_PAYLOAD_MAPPING = {
	get_api: {
		endpoint      : '/get_shipment_operating_procedure',
		getParams     : getOceanParams,
		dataFormatter : oceanFormatter,
	},
	list_api: {
		endpoint      : '/list_shipment_operating_procedures',
		getParams     : getListParams,
		dataFormatter : listDataFormatter,
	},
};

const useGetModeSopData = ({
	shipmentData = {},
	controlType = '',
}) => {
	const {
		endpoint = '',
		getParams = () => {},
		dataFormatter = () => {},
	} = MODE_WISE_PAYLOAD_MAPPING[controlType] || MODE_WISE_PAYLOAD_MAPPING.get_api;

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

	const { data:notesData, procedureId } = dataFormatter({ data }) || {};

	return {
		loading,
		notesData,
		procedureId,
		getModeSopData,
	};
};
export default useGetModeSopData;
