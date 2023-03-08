import { format } from '@cogoport/utils';

const columns = [
	{
		label  : 'RFQ ID',
		key    : 'rfq_id',
		render : (item) => (
			<div className="card-list-item-value">
				{item?.serial_id}
			</div>
		),
		flex: 1,
	},
	{
		label  : 'Customer Name',
		key    : 'customer_name',
		render : (item) => (
			<div className="card-list-item-value">
				{item?.importer_exporter?.short_name}
			</div>
		),
		flex: 4,
	},
	{
		label  : 'No Of Port Pairs',
		key    : 'no_of_port_pairs',
		render : (item) => (
			<div className="card-list-item-value">
				{item?.total_port_pair}
			</div>
		),
		flex: 2,
	},
	{
		label  : 'Last Updated',
		key    : 'last_updated',
		render : (item) => {
			const formatDate = format(item.updated_at, 'dd MMM yy');
			return (
				<div className="card-list-item-value">
					{formatDate}
				</div>
			);
		},
		flex: 2,
	},
	{
		label  : 'Created  At',
		key    : 'created_at',
		render : (item) => {
			const formatDate = format(item.created_at, 'dd MMM yy');
			return (
				<div className="card-list-item-value">
					{formatDate}
				</div>
			);
		},
		flex: 2,
	},
];

export default columns;
