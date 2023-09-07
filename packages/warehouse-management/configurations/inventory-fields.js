import { startCase, isEmpty } from '@cogoport/utils';

const inventoryFields = {
	fields: [
		{
			key   : 'shipmentId',
			label : 'SID No.',
			span  : 1.5,
		},
		{
			key   : 'warehouseLocation',
			label : 'Warehouse Location',
			span  : 2.5,
			func  : 'handleWarehouseLocation',
		},
		{
			key   : 'noOfBoxes',
			label : 'No. of Boxes',
			span  : 1.5,
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
			key   : 'cargoNumber',
			label : 'Cargo Number',
			span  : 2.2,
		},
		{
			key    : 'warehouseLocation',
			label  : 'Warehouse Location',
			span   : 2.2,
			render : (item) => {
				const {
					warehouseLocation: {
						zoneNumber = '',
						aisleNumber = '',
						rackNumber = '',
						shelfNumber = '',
						binNumber = '',
					} = {},
				} = item;
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
						: item?.services?.map((service) => (
							<span key={service.serviceName}>
								{ `${startCase(service.serviceName)}, ` }
							</span>
						))
}
				</div>
			),
		},
		{
			key   : 'serviceStatus',
			label : 'Status',
			span  : 2.2,
			func  : 'startCase',
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
