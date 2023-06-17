import {
	asyncListShipmentPendingTasks,
	asyncListShipmentServices,
	asyncListShipments,
	useGetAsyncOptions,
} from '@cogoport/forms';
import { startCase } from '@cogoport/utils';

const useDocumentTypeControls = ({
	orgId = '',
	account_type = '',
	watchListShipment = '',
	resetField = () => {},
}) => {
	const listShipments = useGetAsyncOptions(
		account_type === 'service_provider' ? {
			...asyncListShipmentServices(),
			params: {
				filters: {
					service_provider_id: orgId,
				},
			},
		} : {
			...asyncListShipments(),
			params: {
				filters: {
					importer_exporter_id: orgId,
				},
			},
		},
	);

	const listShipmentsPendingTasks = useGetAsyncOptions({
		...asyncListShipmentPendingTasks(),
		params: {
			filters: {
				organization_id : orgId,
				shipment_id     : watchListShipment,
				status          : ['pending', 'rejected', 'deleted'],
			},
		},
		initialCall: false,
	});

	const options = listShipmentsPendingTasks?.options;

	const filteredOptions = options.filter((itm) => itm?.document_type);

	return [
		{
			name        : 'list_shipments',
			label       : 'Shipment Serial ID',
			controlType : 'select',
			placeholder : 'Select SID',
			rules       : {
				required: '*This is required',
			},

			renderLabel: (item) => (account_type === 'service_provider'
				? `${item?.shipment_serial_id}, ${startCase(item?.service_type)}` : `${item?.serial_id}`),

			onChange: () => { resetField('list_shipment_pending_tasks'); },
			...listShipments,
		},
		{
			name        : 'list_shipment_pending_tasks',
			label       : 'Pending Tasks',
			controlType : 'select',
			placeholder : 'Select Pending Tasks',
			value       : '',
			renderLabel : (item) => `${startCase(item?.document_type)}`,
			...(watchListShipment !== '' ? listShipmentsPendingTasks : []),
			options     : filteredOptions,
		},
	];
};

export default useDocumentTypeControls;
