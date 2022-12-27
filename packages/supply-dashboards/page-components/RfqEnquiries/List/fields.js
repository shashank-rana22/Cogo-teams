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
		span: 2,
	},
	{
		label  : 'Customer Name',
		key    : 'customer_name',
		render : (item) => (
			<div className="card-list-item-value">
				{item?.user?.name}
			</div>
		),
		span: 2,
	},
	{
		label  : 'No Of Port Pairs',
		key    : 'no_of_port_pairs',
		render : (item) => (
			<div className="card-list-item-value">
				{item?.total_port_pair}
			</div>
		),
		span: 2,
	},
	{
		label  : 'Last Updated',
		key    : 'last_updated',
		render : (item) => {
			const formatDate = format(item.updated_at, 'dd MMM yy | hh:mm a');
			return (
				<div className="card-list-item-value">
					{formatDate}
				</div>
			);
		},
		span: 2,
	},
	{
		label  : '',
		key    : 'edit',
		span   : 2,
		render : (item) => (
			<div>{item.total_port_pair}</div>
		),
	},
];

export default columns;
