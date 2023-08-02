const configureFields = {
	fields: [
		{
			key    : 'zone_name',
			label  : 'Zone name',
			span   : 0.8,
			render : (item) => {
				<div>
					{item?.zoneName}
				</div>;
			},
		},
		{
			key    : 'commodity_type',
			label  : 'Commodity Type',
			span   : 1.2,
			render : (item) => {
				<div>
					{item?.commodityType}
				</div>;
			},
		},
		{
			key    : 'aisle_types',
			label  : 'No. of Aisle Type',
			span   : 1,
			render : (item) => {
				<div>
					{item?.aisles?.aislesCount}
				</div>;
			},
		},
		{
			key    : 'racks',
			label  : 'No. of Racks',
			span   : 1.5,
			render : (item) => {
				<div>
					{item?.aisles?.racksCount}
				</div>;
			},
		},
		{
			key    : 'shelf',
			label  : 'No. of Shelf in Rack',
			span   : 1.5,
			render : (item) => {
				<div>
					{item?.aisles?.shelvesCount}
				</div>;
			},
		},
		{
			key    : 'number_by_bin_size',
			label  : 'Number / size of bin',
			span   : 1,
			render : (item) => {
				<div>
					{`x${item.totalBinsInShelf} (${item.binLength} x ${item.binWidth} x ${item.binHeight})`}
				</div>;
			},
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
