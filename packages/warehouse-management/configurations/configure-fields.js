import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const configureFields = [
	{
		key   : 'zoneName',
		label : 'Zone name',
		span  : 2,
	},
	{
		key   : 'commodity',
		label : 'Commodity',
		span  : 2,
		func  : 'startCase',
	},
	{
		key    : 'aislesCount',
		label  : 'No. of Aisle',
		span   : 1.5,
		render : (item) => (
			<div>
				{item?.aisles?.[GLOBAL_CONSTANTS.zeroth_index]?.aislesCount || '-'}
			</div>
		),
	},
	{
		key    : 'racksCount',
		label  : 'No. of Racks',
		span   : 1.5,
		render : (item) => (
			<div>
				{item?.aisles?.[GLOBAL_CONSTANTS.zeroth_index]?.racksCount || '-'}
			</div>
		),
	},
	{
		key    : 'shelvesCount',
		label  : 'No. of Shelf in Rack',
		span   : 1.5,
		render : (item) => (
			<div>
				{item?.aisles?.[GLOBAL_CONSTANTS.zeroth_index]?.shelvesCount || '-'}
			</div>
		),
	},
	{
		key    : 'binDimensions',
		label  : 'Number / size of bin',
		span   : 2.5,
		render : (item) => (
			<div>
				{item.aisles?.[GLOBAL_CONSTANTS.zeroth_index]?.binsCount
					? `${item.aisles?.[GLOBAL_CONSTANTS.zeroth_index]?.binsCount} 
					(${item.aisles?.[GLOBAL_CONSTANTS.zeroth_index]?.binLength} 
						x ${item.aisles?.[GLOBAL_CONSTANTS.zeroth_index]?.binWidth} x 
						${item.aisles?.[GLOBAL_CONSTANTS.zeroth_index]?.binHeight})` : '-'}
			</div>
		),
	},
	{
		key   : 'edit',
		label : 'Actions',
		span  : 0.5,
		func  : 'handleEdit',
	},
	{
		key   : 'delete',
		label : '',
		span  : 0.5,
		func  : 'handleDelete',
	},
];

export default configureFields;
