import { startCase } from '@cogoport/utils';

const getParamsOptionsMapping = ({ orgId }) => ({
	service_provider: {
		asyncKey : 'list_shipment_services',
		params   : {
			filters: {
				service_provider_id: orgId,
			},
		},
	},
	importer_exporter: {
		asyncKey : 'list_shipments',
		params   : {
			filters: {
				importer_exporter_id: orgId,
			},
		},
	},
});

const useGetDocumentTypeControls = ({
	orgId = '',
	account_type = '',
	watchListShipment = '',
	resetField = () => {},
}) => {
	const paramsMapping = getParamsOptionsMapping({ orgId });

	return [
		{
			name        : 'list_shipments',
			label       : 'Shipment Serial ID',
			placeholder : 'Select SID',
			rules       : {
				required: '*This is required',
			},
			initialCall : true,
			onChange    : () => resetField('list_shipment_pending_tasks'),
			renderLabel : (item) => (account_type === 'service_provider'
				? `${item?.shipment_serial_id}, ${startCase(item?.service_type)}` : `${item?.serial_id}`),
			...(paramsMapping?.[account_type || 'importer_exporter']),
		},
		{
			name        : 'list_shipment_pending_tasks',
			label       : 'Pending Tasks',
			placeholder : 'Select Pending Tasks',
			value       : '',
			rules       : {
				required: '*This is required',
			},
			initialCall : true,
			params      : {
				filters: {
					task_type       : 'upload_document',
					organization_id : orgId,
					shipment_id     : watchListShipment,
					status          : ['pending', 'rejected', 'deleted'],
				},
			},
			asyncKey    : watchListShipment ? 'list_shipment_pending_tasks' : null,
			renderLabel : (item) => startCase(item?.document_type),
		},
	];
};

export default useGetDocumentTypeControls;
