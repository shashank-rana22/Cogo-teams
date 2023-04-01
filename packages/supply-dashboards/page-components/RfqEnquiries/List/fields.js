import { Button, Tooltip } from '@cogoport/components';
import { format } from '@cogoport/utils';

const handleOnClick = ({ e, setShow, show }) => {
	e.stopPropagation();
	setShow(!show);
};

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
			<Tooltip content={(
				<div className="card-list-item-value">
					{item?.importer_exporter?.short_name}
				</div>
			)}
			>
				<div className="card-list-item-value">
					<div style={{
						width        : '100px',
						overflow     : 'hidden',
						textOverflow : 'ellipsis',
						whiteSpace   : 'nowrap',
					}}
					>
						{item?.importer_exporter?.short_name}

					</div>

				</div>
			</Tooltip>

		),
		flex: 2,
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
	{
		label  : '',
		key    : 'action',
		render : (item, setSelectedRate, selectedRate, show, setShow) => (
			<div className="card-list-item-value">
				<Button
					onClick={(e) => handleOnClick(
						{
							e,
							item,
							setSelectedRate,
							selectedRate,
							show,
							setShow,
						},
					)}
					size="sm"
				>
					Close For Me

				</Button>
			</div>
		),
		flex: 2,
	},
];

export default columns;
