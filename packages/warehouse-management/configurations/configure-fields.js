import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const configureFields = {
	fields: [
		{
			key    : 'zoneName',
			label  : 'Zone name',
			span   : 0.8,
			render : (item) => (
				<div>
					{item?.zoneName}
				</div>
			),
		},
		{
			key    : 'commodityType',
			label  : 'Commodity Type',
			span   : 1.2,
			render : (item) => (
				<div>
					{item?.commodityType}
				</div>
			),
		},
		{
			key    : 'aislesCount',
			label  : 'No. of Aisle Type',
			span   : 1,
			render : (item) => (
				<div>
					{item?.aisles[GLOBAL_CONSTANTS.zeroth_index]?.aislesCount}
				</div>
			),
		},
		{
			key    : 'racksCount',
			label  : 'No. of Racks',
			span   : 1.5,
			render : (item) => (
				<div>
					{item?.aisles[GLOBAL_CONSTANTS.zeroth_index]?.racksCount}
				</div>
			),
		},
		{
			key    : 'shelvesCount',
			label  : 'No. of Shelf in Rack',
			span   : 1.5,
			render : (item) => (
				<div>
					{item?.aisles[GLOBAL_CONSTANTS.zeroth_index]?.shelvesCount}
				</div>
			),
		},
		{
			key    : 'binDimensions',
			label  : 'Number / size of bin',
			span   : 1,
			render : (item) => (
				<div>
					{`x${item.aisles[GLOBAL_CONSTANTS.zeroth_index].totalBinsInShelf} 
					(${item.aisles[GLOBAL_CONSTANTS.zeroth_index].binLength} 
						x ${item.aisles[GLOBAL_CONSTANTS.zeroth_index].binWidth} x 
						${item.aisles[GLOBAL_CONSTANTS.zeroth_index].binHeight})`}
				</div>
			),
		},
		{
			key   : 'delete',
			label : 'Actions',
			span  : 0.4,
			func  : 'handleDelete',
		},
		{
			key   : 'edit',
			label : '',
			span  : 0.4,
			func  : 'handleEdit',
		},
	],
};

export default configureFields;
