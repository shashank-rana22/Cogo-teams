import { startCase, isEmpty } from '@cogoport/utils';

const inventoryFields = {
	fields: [
		{
			key    : 'sid',
			label  : 'SID No.',
			span   : 1.5,
			render : (item) => (
				<div>
					{item?.shipmentId}
				</div>
			),
		},
		{
			key   : 'warehouseLocation',
			label : 'Warehouse Location',
			span  : 2.5,
			func  : 'handleWarehouseLocation',
		},
		{
			key    : 'noOfBoxes',
			label  : 'No. of Boxes',
			span   : 1.5,
			render : (item) => (
				<div>
					{item?.noOfBoxes}
				</div>
			),
		},
		{
			key   : 'services',
			label : 'Services',
			span  : 1,
			func  : 'handleServices',
		},
		{
			key   : 'status',
			label : 'Status',
			span  : 1,
			func  : 'handleStatus',
		},
	],
	showMoreFields: [
		{
			key    : 'cargoNumber',
			label  : 'Cargo Number',
			span   : 2.2,
			render : (item) => (
				<div>
					{item?.cargoNumber}
				</div>
			),
		},
		{
			key    : 'warehouseLocation',
			label  : 'Warehouse Location',
			span   : 2.2,
			render : (item) => {
				const { warehouseLocation = {} } = item;
				const {
					zoneNumber = '',
					aisleNumber = '', rackNumber = '', shelfNumber = '', binNumber = '',
				} = warehouseLocation;
				return (
					<div>
						{`${zoneNumber}-${aisleNumber}-${rackNumber}-${shelfNumber}-${binNumber}`}
					</div>
				);
			},
		},
		{
			key    : 'dimensions',
			label  : 'Dimensions',
			span   : 2.2,
			render : (item) => (
				<div>
					{`${item?.dimensions?.length ?? '-'} x
					 ${item?.dimensions?.width ?? '-'} x 
					 ${item?.dimensions?.height ?? '-'} `}
				</div>
			),
		},
		{
			key    : 'services',
			label  : 'Services',
			span   : 2.2,
			render : (item) => (
				<div>
					{
					isEmpty(item)
						? '-'
						: item?.services.map((service) => (
							<span key={service.serviceName}>
								{ `${startCase(service.serviceName)}, ` }
							</span>
						))
}
				</div>
			),
		},
		{
			key    : 'status',
			label  : 'Status',
			span   : 2.2,
			render : (item) => (
				<div>
					{startCase(item?.serviceStatus) || '-'}
				</div>
			),
		},
		{
			key   : 'update',
			label : 'Actions',
			span  : 2.1,
			func  : 'handleUpdateStatus',
		},
	],
};

export default inventoryFields;
